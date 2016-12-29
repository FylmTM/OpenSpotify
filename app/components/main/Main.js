// @flow
import React, { Component } from 'react';
import styles from './Main.css';
import { Header } from './parts/Header';
import { Sidebar } from './parts/Sidebar';
import { Player } from './player/Player';

export class Main extends Component {
  props: {
    children: HTMLElement,
    spotifyLibLoginWithSavedCredentials: Function,
    spotifyWebLogout: Function,
    player: Object,
    playerPlay: Function,
    playerStop: Function
  };

  render() {
    return (
      <div className="row full-height">
        <div className="col full-height">
          <div className={`${styles.mainContainer} full-height`}>
            <div className="row">
              <div className="col">
                <Header logout={this.props.spotifyWebLogout}/>
              </div>
            </div>
            <div className={styles.mainContent}>
              <div className="row full-height">
                <div className={`col full-height ${styles.sidebar}`}>
                  <Sidebar/>
                </div>
                <div className={`col full-height ${styles.mainContentPane}`}>
                  {this.props.children}
                </div>
              </div>
            </div>
            <div className="row dark-bg pt-elevation-1">
              <div className={`col ${styles.player}`}>
                <Player state={this.props.player}
                        authenticate={this.props.spotifyLibLoginWithSavedCredentials}
                        play={this.props.playerPlay}
                        stop={this.props.playerStop}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Main.propTypes = {
  spotifyLibLoginWithSavedCredentials: React.PropTypes.func,
  spotifyWebLogout: React.PropTypes.func,
  player: React.PropTypes.object,
  playerPlay: React.PropTypes.func,
  playerStop: React.PropTypes.func
};
