// @flow
import { ipcRenderer } from 'electron';
import { PLAYER_PLAY, PLAYER_STOP } from '../actions/player';

export default function player(state: Object = {}, action: Object) {
  switch (action.type) {
    case PLAYER_PLAY:
      ipcRenderer.send('player-play', {
        spotifyUri: action.spotifyUri,
        offsetInMs: action.offsetInMs
      });
      return state;
    case PLAYER_STOP:
      ipcRenderer.send('player-stop');
      return state;
    default:
      return state;
  }
}
