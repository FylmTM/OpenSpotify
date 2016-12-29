// @flow
import {
  SPOTIFY_WEB_AUTHENTICATION_START,
  SPOTIFY_WEB_AUTHENTICATION_SUCCESS,
  SPOTIFY_WEB_AUTHENTICATION_FAIL,
  SPOTIFY_WEB_AUTHENTICATION_LOGOUT
} from '../actions/spotifyWebAuthentication';
import { SpotifyWebClient } from '../api/SpotifyWebClient';

export default function spotifyWebAuthentication(state: ?Object, action: Object): Object {
  if (typeof state === 'undefined') {
    return {
      loginState: 'NOT_STARTED'
    };
  }
  switch (action.type) {
    case SPOTIFY_WEB_AUTHENTICATION_START:
      return Object.assign({}, state, {
        loginState: 'STARTED'
      });
    case SPOTIFY_WEB_AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        loginState: 'SUCCESS',
        loginError: undefined
      });
    case SPOTIFY_WEB_AUTHENTICATION_FAIL:
      return Object.assign({}, state, {
        loginState: 'ERROR',
        loginError: action.error
      });
    case SPOTIFY_WEB_AUTHENTICATION_LOGOUT:
      SpotifyWebClient.clearAuth();
      return Object.assign({}, state, {
        loginState: 'NOT_STARTED'
      });
    default:
      // $FlowFixMe: This case is handled in the beginning
      return state;
  }
}
