import electronOauth2 from 'electron-oauth2';
import SpotifyWebApi from 'spotify-web-api-node';

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
const options = {
  scope: 'user-library-read user-library-modify',
};

const spotifyOauth = electronOauth2(config, windowParams);
const spotifyWebApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost'
});

export class SpotifyWebAuthentication {

  authorize = () => {
    return spotifyOauth
      .getAuthorizationCode(options)
      .then(code => {
        return spotifyWebApi.authorizationCodeGrant(code);
      });
  };
}
