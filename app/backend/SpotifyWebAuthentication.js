import electronOauth2 from 'electron-oauth2';
import SpotifyWebApi from 'spotify-web-api-node';

export class SpotifyWebAuthentication {

  constructor() {
    const config = {
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.spotify.com/authorize',
      tokenUrl: 'https://accounts.spotify.com/api/token',
      useBasicAuthorizationHeader: false,
      redirectUri: 'http://localhost'
    };
    const windowParams = {
      alwaysOnTop: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false
      }
    };

    this.spotifyOauth = electronOauth2(config, windowParams);
    this.spotifyWebApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: 'http://localhost'
    });
  }

  authorize = () => this.spotifyOauth
    .getAuthorizationCode({
      scope: 'user-library-read user-library-modify',
    })
    .then(code => this.spotifyWebApi.authorizationCodeGrant(code));
}
