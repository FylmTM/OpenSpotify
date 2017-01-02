// @flow
import type { ApplicationAction } from './types';
import { SpotifyWebClient } from '../api/SpotifyWebClient';

function spotifyWebLoginStart(): ApplicationAction {
  return {
    type: 'SPOTIFY_WEB_AUTHENTICATION_START'
  };
}

function spotifyWebLoginSuccess(): ApplicationAction {
  return {
    type: 'SPOTIFY_WEB_AUTHENTICATION_SUCCESS'
  };
}

function spotifyWebLoginFail(error: string): ApplicationAction {
  return {
    type: 'SPOTIFY_WEB_AUTHENTICATION_FAIL',
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

export function spotifyWebLogout(): ApplicationAction {
  return {
    type: 'SPOTIFY_WEB_AUTHENTICATION_LOGOUT'
  };
}
