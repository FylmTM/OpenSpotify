// @flow
import type { ApplicationAction } from './types';
import { SpotifyLibClient } from '../api/SpotifyLibClient';

function spotifyLibLoginStart(): ApplicationAction {
  return {
    type: 'SPOTIFY_LIB_AUTHENTICATION_START'
  };
}

function spotifyLibLoginSuccess(): ApplicationAction {
  return {
    type: 'SPOTIFY_LIB_AUTHENTICATION_SUCCESS'
  };
}

function spotifyLibLoginFail(error: string): ApplicationAction {
  return {
    type: 'SPOTIFY_LIB_AUTHENTICATION_FAIL',
    error
  };
}

function spotifyLibLogoutStart(): ApplicationAction {
  return {
    type: 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_START'
  };
}

function spotifyLibLogoutSuccess(): ApplicationAction {
  return {
    type: 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_SUCCESS'
  };
}

function spotifyLibLogoutFail(): ApplicationAction {
  return {
    type: 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_FAIL'
  };
}

export function spotifyLibLogin(login: string, password: string) {
  return (dispatch: Function) => {
    dispatch(spotifyLibLoginStart());

    return SpotifyLibClient.authenticate(login, password)
      .then(() => dispatch(spotifyLibLoginSuccess()))
      .catch(error => dispatch(spotifyLibLoginFail(error)));
  };
}

export function spotifyLibLoginWithSavedCredentials() {
  return (dispatch: Function) => {
    dispatch(spotifyLibLoginStart());

    return SpotifyLibClient.getCredentials()
      .then((credentials) => {
        if (credentials.login && credentials.password) {
          return SpotifyLibClient.authenticate(credentials.login, credentials.password);
        } else {
          return Promise.reject('No saved credentials.');
        }
      })
      .then(() => dispatch(spotifyLibLoginSuccess()))
      .catch(error => dispatch(spotifyLibLoginFail(error)));
  };
}

export function spotifyLibLogout() {
  return (dispatch: Function) => {
    dispatch(spotifyLibLogoutStart());

    return SpotifyLibClient.logout()
      .then(() => dispatch(spotifyLibLogoutSuccess()))
      .catch(error => dispatch(spotifyLibLogoutFail(error)));
  };
}
