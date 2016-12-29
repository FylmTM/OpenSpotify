// @flow
import { SpotifyWebClient } from '../api/SpotifyWebClient';

export const SPOTIFY_WEB_AUTHENTICATION_START = 'SPOTIFY_WEB_AUTHENTICATION_START';
export const SPOTIFY_WEB_AUTHENTICATION_SUCCESS = 'SPOTIFY_WEB_AUTHENTICATION_SUCCESS';
export const SPOTIFY_WEB_AUTHENTICATION_FAIL = 'SPOTIFY_WEB_AUTHENTICATION_FAIL';
export const SPOTIFY_WEB_AUTHENTICATION_LOGOUT = 'SPOTIFY_WEB_AUTHENTICATION_LOGOUT';

function spotifyWebLoginStart() {
  return {
    type: SPOTIFY_WEB_AUTHENTICATION_START
  };
}

function spotifyWebLoginSuccess() {
  return {
    type: SPOTIFY_WEB_AUTHENTICATION_SUCCESS
  };
}

function spotifyWebLoginFail(error: string) {
  return {
    type: SPOTIFY_WEB_AUTHENTICATION_FAIL,
    error
  };
}

export function spotifyWebLogin() {
  return (dispatch: Function) => {
    dispatch(spotifyWebLoginStart());

    return SpotifyWebClient.authenticate()
      .then(() => SpotifyWebClient.getMe())
      .then(() => dispatch(spotifyWebLoginSuccess()))
      .catch(error => dispatch(spotifyWebLoginFail(error.toString())));
  };
}

export function spotifyWebLogout() {
  return {
    type: SPOTIFY_WEB_AUTHENTICATION_LOGOUT
  };
}
