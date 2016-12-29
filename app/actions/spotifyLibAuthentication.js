// @flow
import { SpotifyLibClient } from '../api/SpotifyLibClient';

export const SPOTIFY_LIB_AUTHENTICATION_START = 'SPOTIFY_LIB_AUTHENTICATION_START';
export const SPOTIFY_LIB_AUTHENTICATION_SUCCESS = 'SPOTIFY_LIB_AUTHENTICATION_SUCCESS';
export const SPOTIFY_LIB_AUTHENTICATION_FAIL = 'SPOTIFY_LIB_AUTHENTICATION_FAIL';
export const SPOTIFY_LIB_AUTHENTICATION_LOGOUT_START = 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_START';
export const SPOTIFY_LIB_AUTHENTICATION_LOGOUT_SUCCESS = 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_SUCCESS';
export const SPOTIFY_LIB_AUTHENTICATION_LOGOUT_FAIL = 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_FAIL';

function spotifyLibLoginStart() {
  return {
    type: SPOTIFY_LIB_AUTHENTICATION_START
  };
}

function spotifyLibLoginSuccess() {
  return {
    type: SPOTIFY_LIB_AUTHENTICATION_SUCCESS
  };
}

function spotifyLibLoginFail(error: string) {
  return {
    type: SPOTIFY_LIB_AUTHENTICATION_FAIL,
    error
  };
}

function spotifyLibLogoutStart() {
  return {
    type: SPOTIFY_LIB_AUTHENTICATION_LOGOUT_START
  };
}

function spotifyLibLogoutSuccess() {
  return {
    type: SPOTIFY_LIB_AUTHENTICATION_LOGOUT_SUCCESS
  };
}

function spotifyLibLogoutFail() {
  return {
    type: SPOTIFY_LIB_AUTHENTICATION_LOGOUT_FAIL
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
