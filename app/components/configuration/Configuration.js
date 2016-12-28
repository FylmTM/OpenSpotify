import React, { Component } from "react";
import { SpotifyLibConfiguration } from "./parts/SpotifyLibConfiguration";

export class Configuration extends Component {
  props: {
    spotifyLibState: Object,
    spotifyLibLogin: Function,
    spotifyLibLogout: Function
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <SpotifyLibConfiguration state={this.props.spotifyLibState}
                                   login={this.props.spotifyLibLogin}
                                   logout={this.props.spotifyLibLogout}/>
        </div>
      </div>
    );
  }
}

Configuration.propTypes = {
  spotifyLibState: React.PropTypes.object.isRequired,
  spotifyLibLogin: React.PropTypes.func.isRequired,
  spotifyLibLogout: React.PropTypes.func.isRequired
};
