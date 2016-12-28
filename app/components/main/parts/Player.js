// @flow
import React, { Component } from "react";
import { Link } from "react-router";
import styles from "./Player.css";
import { Spinner } from "@blueprintjs/core";

export class Player extends Component {
  props: {
    state: {
      enabled: boolean,
      authState: string
    },
    authenticate: Function,
    play: Function,
    stop: Function
  };
  state: {
    playing: boolean
  };
  currentTrack: string;

  constructor(props: Object) {
    super(props);
    this.currentTrack = 'spotify:track:2BzdkiamnFVJPiR6N5YJ4d';
    this.state = {
      playing: false
    };
  }

  handlePlay = (event) => {
    event.preventDefault();
    this.setState({playing: true});
    this.props.play(this.currentTrack, 0);
  };

  handleStop = (event) => {
    event.preventDefault();
    this.setState({playing: false});
    this.props.stop();
  };

  componentDidMount() {
    if (!this.props.state.enabled) {
      this.props.authenticate();
    }
  }

  render() {
    if (this.props.state.authState == 'LOGIN_STARTED') {
      return (
        <div className={`${styles.playerCenter} full-height`}>
          <div>
            <Spinner className="pt-small"/>
          </div>
        </div>
      )
    }

    if (!this.props.state.enabled) {
      return (
        <div className={`${styles.playerCenter} full-height`}>
          <div>
            Playback functionality disabled.<br/>
            <Link to="/main/configuration">Configure libspotify.</Link>
          </div>
        </div>
      )
    }

    if (this.state.playing) {
      return (
        <div className={`${styles.playerCenter} full-height`}>
          <button className="pt-button" onClick={this.handleStop}>stop</button>
        </div>
      )
    } else {
      return (
        <div className={`${styles.playerCenter} full-height`}>
          <button className="pt-button" onClick={this.handlePlay}>play</button>
        </div>
      );
    }
  }
}

Player.propTypes = {
  state: React.PropTypes.object,
  authenticate: React.PropTypes.func,
  play: React.PropTypes.func,
  stop: React.PropTypes.func
};

