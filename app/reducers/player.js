// @flow
import { ipcRenderer } from 'electron';
import type { AnyAction, ApplicationAction } from '../actions/types';
import type { PlayerState } from '../store/types';

const initialState = {
  playing: false
};

export function player(state: PlayerState = initialState, action: AnyAction): PlayerState {
  if (action.type.startsWith('@@')) {
    return state;
  }
  return playerInternal(state, (action: any));
}

function playerInternal(state: PlayerState, action: ApplicationAction) {
  if (action.type === 'PLAYER_PLAY') {
    ipcRenderer.send('player-play', {
      spotifyUri: action.spotifyUri,
      offsetInMs: action.offsetInMs
    });
    return {
      ...state,
      playing: true
    };
  }

  if (action.type === 'PLAYER_STOP') {
    ipcRenderer.send('player-stop');
    return {
      ...state,
      playing: false
    };
  }

  return state;
}
