// @flow
import type { ApplicationAction, AnyAction } from '../actions/types';
import type { SpotifyWebAuthenticationState } from '../store/types';
import { SpotifyWebClient } from '../api/SpotifyWebClient';

const initialState = {
  loginState: 'NOT_STARTED',
  loginError: null
};

export function spotifyWebAuthentication(state: SpotifyWebAuthenticationState = initialState,
                                         action: AnyAction): SpotifyWebAuthenticationState {
  if (action.type.startsWith('@@')) {
    return state;
  }
  return spotifyWebAuthenticationInternal(state, (action: any));
}

function spotifyWebAuthenticationInternal(state: SpotifyWebAuthenticationState = initialState,
                                          action: ApplicationAction): SpotifyWebAuthenticationState {
  if (action.type === 'SPOTIFY_WEB_AUTHENTICATION_START') {
    return {
      ...state,
      loginState: 'STARTED',
      loginError: undefined
    };
  }

  if (action.type === 'SPOTIFY_WEB_AUTHENTICATION_SUCCESS') {
    return {
      ...state,
      loginState: 'SUCCESS',
      loginError: undefined
    };
  }

  if (action.type === 'SPOTIFY_WEB_AUTHENTICATION_FAIL') {
    return {
      ...state,
      loginState: 'ERROR',
      loginError: action.error
    };
  }

  if (action.type === 'SPOTIFY_WEB_AUTHENTICATION_LOGOUT') {
    SpotifyWebClient.clearAuth();
    return {
      ...state,
      loginState: 'NOT_STARTED'
    };
  }

  return state;
}
