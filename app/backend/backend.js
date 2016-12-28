// @flow
import { ipcMain } from "electron";
import path from "path";
import os from "os";
import libspotify from "libspotify";
import Player from "./player";
import { SpotifyWebAuthentication } from "./SpotifyWebAuthentication";

const baseDir = path.join(os.homedir(), ".open-spotify");
const libspotifyDir = path.join(baseDir, "libspotify");

let session: libspotify.Session;
let player: libspotify.Player;
let spotifyAuth: SpotifyWebAuthentication;

export default class Backend {
  static initialize() {
    console.log("Initialize backend...");

    console.log("Create session...");
    session = new libspotify.Session({
      applicationKey: __dirname + '/libspotify/app.key',
      cacheLocation: libspotifyDir,
      settingsLocation: libspotifyDir
    });
    player = new Player(session);

    spotifyAuth = new SpotifyWebAuthentication();

    console.log("Setup backend event handling...");
    this.bindEvents();
  }

  static stop() {
    console.log("Stop backend");
    if (session.isLoggedIn()) {
      session.logout();
    }
    session.close();
  }

  static bindEvents() {
    ipcMain.on('spotify-lib-auth', (event, arg: Object) => {
      console.log("[backend:libspotify] Process login for:", arg.login);

      const doLogin = () => {
        session.once('login', (error) => {
          if (error) {
            console.log("[backend:libspotify] Auth error", error.toString());
            event.sender.send('spotify-lib-auth-result', {type: 'error', error: error.toString()});
          } else {
            console.log("[backend:libspotify] Auth success");
            event.sender.send('spotify-lib-auth-result', {type: 'success'});
          }
        });
        session.login(arg.login, arg.password);
      };

      if (session.isLoggedIn()) {
        session.logout(() => {
          doLogin();
        });
      } else {
        doLogin();
      }
    });
    ipcMain.on('spotify-lib-auth-logout', (event) => {
      console.log("[backend:libspotify] Process logout");
      if (!session.isLoggedIn()) {
        // We are not logged in, so nothing to do
        event.sender.send('spotify-lib-auth-logout-finished');
        return;
      }
      session.logout(() => {
        event.sender.send('spotify-lib-auth-logout-finished');
      });
    });

    ipcMain.on('spotify-web-auth', (event) => {
      console.log("Authorize user throught spotify web...");
      spotifyAuth.authorize()
        .then(data => {
          event.sender.send('spotify-web-auth-result', {type: 'success', data: data})
        })
        .catch(error => {
          event.sender.send('spotify-web-auth-result', {type: 'error', error: error.toString()})
        })
    });

    ipcMain.on('player-play', (event, arg: Object) => {
      if (!session.isLoggedIn()) return;
      player.play(arg.spotifyUri, arg.offsetInMs);
    });
    ipcMain.on('player-stop', (event) => {
      if (!session.isLoggedIn()) return;
      player.stop();
    });
  }
}
