// @flow
export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_STOP = 'PLAYER_STOP';

export function playerPlay(spotifyUri: string, offsetInMs: number) {
  return { type: PLAYER_PLAY, spotifyUri, offsetInMs };
}

export function playerStop() {
  return { type: PLAYER_STOP };
}
