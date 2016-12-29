// @flow
import {
  SPOTIFY_LIB_AUTHENTICATION_START,
  SPOTIFY_LIB_AUTHENTICATION_SUCCESS,
  SPOTIFY_LIB_AUTHENTICATION_FAIL,
  SPOTIFY_LIB_AUTHENTICATION_LOGOUT_START,
  SPOTIFY_LIB_AUTHENTICATION_LOGOUT_SUCCESS,
  SPOTIFY_LIB_AUTHENTICATION_LOGOUT_FAIL,
} from '../actions/spotifyLibAuthentication';

export default function spotifyLibAuthentication(state: ?Object, action: Object): Object {
  if (typeof state === 'undefined') {
    return {
      loggedIn: false,
      authState: 'UNKNOWN',
    };
  }
  switch (action.type) {
    case SPOTIFY_LIB_AUTHENTICATION_START:
      return Object.assign({}, state, {
        authState: 'LOGIN_STARTED',
        loggedIn: false
      });
    case SPOTIFY_LIB_AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        authState: 'LOGIN_SUCCESS',
        loggedIn: true
      });
    case SPOTIFY_LIB_AUTHENTICATION_FAIL:
      return Object.assign({}, state, {
        authState: 'LOGIN_ERROR',
        loggedIn: false,
        error: action.error
      });
    case SPOTIFY_LIB_AUTHENTICATION_LOGOUT_START:
      return Object.assign({}, state, {
        authState: 'LOGOUT_STARTED',
        loggedIn: false
      });
    case SPOTIFY_LIB_AUTHENTICATION_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        authState: 'LOGOUT_SUCCESS',
        loggedIn: false
      });
    case SPOTIFY_LIB_AUTHENTICATION_LOGOUT_FAIL:
      return Object.assign({}, state, {
        authState: 'LOGOUT_ERROR',
        loggedIn: false
      });
    default:
      // $FlowFixMe: This case is handled in the beginning
      return state;
  }
}
