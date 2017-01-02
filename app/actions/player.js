// @flow
import type { ApplicationAction } from './types';

export function playerPlay(spotifyUri: string, offsetInMs: number): ApplicationAction {
  return { type: 'PLAYER_PLAY', spotifyUri, offsetInMs };
}

export function playerStop(): ApplicationAction {
  return { type: 'PLAYER_STOP' };
}
