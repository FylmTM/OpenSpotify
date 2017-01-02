// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { player } from './player';
import { spotifyWebAuthentication } from './spotifyWebAuthentication';
import { spotifyLibAuthentication } from './spotifyLibAuthentication';

const rootReducer = combineReducers({
  player,
  spotifyWebAuthentication,
  spotifyLibAuthentication,
  routing
});

export default rootReducer;
