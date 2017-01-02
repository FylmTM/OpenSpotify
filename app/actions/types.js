// @flow

// Player actions
export type PlayerPlayAction = { type: 'PLAYER_PLAY', spotifyUri: string, offsetInMs: number };
export type PlayerStopAction = { type: 'PLAYER_STOP' };

// Spotify Lib Authentication Actions
export type SpotifyLibAuthenticationStartAction = { type: 'SPOTIFY_LIB_AUTHENTICATION_START' };
export type SpotifyLibAuthenticationSuccessAction = { type: 'SPOTIFY_LIB_AUTHENTICATION_SUCCESS' };
export type SpotifyLibAuthenticationFailAction = { type: 'SPOTIFY_LIB_AUTHENTICATION_FAIL', error: string };
export type SpotifyLibAuthenticationLogoutStartAction = { type: 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_START' };
export type SpotifyLibAuthenticationLogoutSuccessAction = { type: 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_SUCCESS' };
export type SpotifyLibAuthenticationLogoutFailAction = { type: 'SPOTIFY_LIB_AUTHENTICATION_LOGOUT_FAIL' };

// Spotify Web Authentication Actions
export type SpotifyWebAuthenticationStartAction = { type: 'SPOTIFY_WEB_AUTHENTICATION_START' };
export type SpotifyWebAuthenticationSuccessAction = { type: 'SPOTIFY_WEB_AUTHENTICATION_SUCCESS' };
export type SpotifyWebAuthenticationFailAction = { type: 'SPOTIFY_WEB_AUTHENTICATION_FAIL', error: string };
export type SpotifyWebAuthenticationLogoutAction = { type: 'SPOTIFY_WEB_AUTHENTICATION_LOGOUT' };

// All actions
export type ApplicationAction = PlayerPlayAction
  | PlayerStopAction
  | SpotifyLibAuthenticationStartAction
  | SpotifyLibAuthenticationSuccessAction
  | SpotifyLibAuthenticationFailAction
  | SpotifyLibAuthenticationLogoutStartAction
  | SpotifyLibAuthenticationLogoutSuccessAction
  | SpotifyLibAuthenticationLogoutFailAction
  | SpotifyWebAuthenticationStartAction
  | SpotifyWebAuthenticationSuccessAction
  | SpotifyWebAuthenticationFailAction
  | SpotifyWebAuthenticationLogoutAction;

export type AnyAction = { type: string } | ApplicationAction;
