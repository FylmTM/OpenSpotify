// @flow
import type { ApplicationAction, AnyAction } from '../actions/types';
import type { SpotifyLibAuthenticationState } from '../store/types';

const initialState = {
  loggedIn: false,
  authState: 'UNKNOWN',
  error: undefined
};
export function spotifyLibAuthentication(state: SpotifyLibAuthenticationState = initialState,
                                         action: AnyAction): SpotifyLibAuthenticationState {
  if (action.type.startsWith('@@')) {
    return state;
  }
  return spotifyLibAuthenticationInternal(state, (action: any));
}

function spotifyLibAuthenticationInternal(state: SpotifyLibAuthenticationState = initialState,
                                          action: ApplicationAction): SpotifyLibAuthenticationState {
  if (action.type === 'SPOTIFY_LIB_AUTHENTICATION_START') {
    return {
      ...state,
      authState: 'LOGIN_STARTED',
      loggedIn: false
    };
  }

  if (action.type === 'SPOTIFY_LIB_AUTHENTICATION_SUCCESS') {
    return {
      ...state,
      authState: 'LOGIN_SUCCESS',
      loggedIn: true,
      error: undefined
    };
  }

  if (action.type === 'SPOTIFY_LIB_AUTHENTICATION_FAIL') {
    return {
      ...state,
      authState: 'LOGIN_ERROR',
      loggedIn: false,
      error: action.error
    };
  }

  if (action.type === 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_START') {
    return {
      ...state,
      authState: 'LOGOUT_STARTED',
      loggedIn: false
    };
  }

  if (action.type === 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_SUCCESS') {
    return {
      ...state,
      authState: 'LOGOUT_SUCCESS',
      loggedIn: false
    };
  }

  if (action.type === 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_FAIL') {
    return {
      ...state,
      authState: 'LOGOUT_ERROR',
      loggedIn: false
    };
  }

  return state;
}
