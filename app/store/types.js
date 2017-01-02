// Player
export type PlayerState = {
  playing: boolean
};

// Spotify lib authentication
export type SpotifyLibAuthenticationAuthState = 'UNKNOWN'
  | 'LOGIN_STARTED'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_ERROR'
  | 'LOGOUT_STARTED'
  | 'LOGOUT_SUCCESS'
  | 'LOGOUT_ERROR';
export type SpotifyLibAuthenticationState = {
  loggedIn: boolean,
  authState: SpotifyLibAuthenticationAuthState,
  error: ?string
};

// Spotify web authentication
export type SpotifyWebAuthenticationLoginState = 'NOT_STARTED'
  | 'STARTED'
  | 'SUCCESS'
  | 'ERROR';
export type SpotifyWebAuthenticationState = {
  loginState: SpotifyWebAuthenticationLoginState,
  loginError: ?string
};

export type ApplicationState = {
  player: PlayerState,
  spotifyLibAuthentication: SpotifyLibAuthenticationState,
  spotifyWebAuthentication: SpotifyWebAuthenticationState
};

