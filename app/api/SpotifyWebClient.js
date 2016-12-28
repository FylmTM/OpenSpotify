// @flow
import { ipcRenderer } from "electron";
import SpotifyWebApi from "spotify-web-api-node";

const accessTokenKey = 'spotifyWebAccessToken';
const refreshTokenKey = 'spotifyWebRefreshToken';
const expiresInKey = 'spotifyWebExpiresIn';

const spotifyWebApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

let userData: ?Object;

export class SpotifyWebClient {

  static authenticate(): Promise<string> {
    if (this.isAuthenticated()) {
      this.populateTokens();
      return Promise.resolve('already authenticated');
    }

    return new Promise((resolve: Function, reject: Function) => {
      ipcRenderer.once('spotify-web-auth-result', (event, args: Object) => {
        switch (args.type) {
          case 'success':
            localStorage.setItem(accessTokenKey, args.data.body['access_token']);
            localStorage.setItem(refreshTokenKey, args.data.body['refresh_token']);
            this.setExpireTime(args.data.body['expires_in']);
            this.populateTokens(true);
            resolve('success');
            break;
          case 'error':
            console.log(args.error);
            reject(args.error);
            break;
          default:
            reject(`Unknown auth result type: ${args.type}`);
            break;
        }
      });
      ipcRenderer.send('spotify-web-auth');
    });
  }

  static isAuthenticated(): boolean {
    if (localStorage.getItem(accessTokenKey) && localStorage.getItem(refreshTokenKey)) {
      return true;
    } else {
      return false;
    }
  }

  static getMe(): Promise<Object> {
    if (userData) {
      return Promise.resolve(userData);
    } else {
      return this.apiRequest()
        .then(() => {
          return spotifyWebApi.getMe()
            .then(data => {
              userData = data.body;
              return Promise.resolve(userData);
            });
        })
    }
  }

  static clearAuth() {
    userData = null;
    spotifyWebApi.resetAccessToken();
    spotifyWebApi.resetRefreshToken();
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(expiresInKey)
  }

  static apiRequest(): Promise {
    this.populateTokens();

    let msTillExpiration = this.getExpireTime() - Date.now();
    if (msTillExpiration < 5 * 60 * 1000) { // 5 minutes
      return spotifyWebApi.refreshAccessToken()
        .then((data) => {
            console.log("Access token expired. Refreshing...");
          localStorage.setItem(accessTokenKey, data.body['access_token']);
          this.setExpireTime(data.body['expires_in']);
          spotifyWebApi.setAccessToken(data.body['access_token']);
          return Promise.resolve();
        })
    } else {
      return Promise.resolve();
    }
  }

  static populateTokens(force = false): void {
    if (force) {
      spotifyWebApi.setAccessToken(localStorage.getItem(accessTokenKey));
      spotifyWebApi.setRefreshToken(localStorage.getItem(refreshTokenKey));
      return;
    }

    if (!spotifyWebApi.getAccessToken()) {
      spotifyWebApi.setAccessToken(localStorage.getItem(accessTokenKey));
    }
    if (!spotifyWebApi.getRefreshToken()) {
      spotifyWebApi.setRefreshToken(localStorage.getItem(refreshTokenKey));
    }
  }

  static getExpireTime(): number {
    return parseInt(localStorage.getItem(expiresInKey));
  }

  static setExpireTime(expireInSecond: number) {
    localStorage.setItem(expiresInKey, Date.now() + (expireInSecond * 1000));
  }
}
