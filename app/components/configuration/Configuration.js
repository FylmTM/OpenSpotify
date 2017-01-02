import React from 'react';
import { SpotifyLibConfiguration } from './parts/SpotifyLibConfiguration';

export class Configuration extends React.Component {
  props: {
    spotifyLibState: Object,
    spotifyLibLogin: Function,
    spotifyLibLogout: Function
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <SpotifyLibConfiguration
            state={this.props.spotifyLibState}
            login={this.props.spotifyLibLogin}
            logout={this.props.spotifyLibLogout}
          />
        </div>
      </div>
    );
  }
}
