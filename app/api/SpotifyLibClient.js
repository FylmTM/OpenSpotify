// @flow
import { ipcRenderer } from "electron";
import { getPassword, replacePassword, deletePassword } from "keytar";
import { SpotifyWebClient } from "./SpotifyWebClient";

let authorized = false;

export class SpotifyLibClient {

  static authenticate(login: string, password: string): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      ipcRenderer.once('spotify-lib-auth-result', (event, args: Object) => {
        switch (args.type) {
          case 'success':
            authorized = true;
            resolve('success');
            break;
          case 'error':
            reject(args.error);
            break;
          default:
            reject(`Unknown auth result type: ${args.type}`);
            break;
        }
      });
      ipcRenderer.send('spotify-lib-auth', {
        login: login,
        password: password
      });
    }).then(result => {
      SpotifyLibClient.updateCredentials(login, password);
      return Promise.resolve(result);
    });
  }

  static updateCredentials(login: string, password: string): void {
    SpotifyWebClient.getMe()
      .then((userData: {id: string}) => {
        replacePassword("openSpotify-libspotify", `${userData.id}-login`, login);
        replacePassword("openSpotify-libspotify", `${userData.id}-password`, password);
      })
      .catch(error => console.error("Update credentials failed", error));
  }

  static getCredentials(): Promise<Object> {
    return SpotifyWebClient.getMe()
      .then((userData: {id: string}) => {
        return Promise.resolve({
          login: getPassword("openSpotify-libspotify", `${userData.id}-login`) || '',
          password: getPassword("openSpotify-libspotify", `${userData.id}-password`) || ''
        })
      });
  }

  static deleteCredentials() {
    SpotifyWebClient.getMe()
      .then((userData: {id: string}) => {
        deletePassword("openSpotify-libspotify", `${userData.id}-login`);
        deletePassword("openSpotify-libspotify", `${userData.id}-password`);
        return Promise.resolve();
      });
  }

  static logout(): Promise<string> {
    if (authorized) {
      return new Promise((resolve: Function, reject: Function) => {
        ipcRenderer.once('spotify-lib-auth-logout-finished', () => {
          authorized = false;
          resolve('logout');
        });
        ipcRenderer.send('spotify-lib-auth-logout');
      });
    } else {
      return Promise.resolve('not authenticated');
    }
  }
}
