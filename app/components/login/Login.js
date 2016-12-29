// @flow
import React, { Component } from 'react';
import { Button, Spinner } from '@blueprintjs/core';
import { SpotifyWebClient } from '../../api/SpotifyWebClient';
import styles from './Login.css';

export class Login extends Component {
  props: {
    loginState: string,
    loginError: string,
    spotifyWebLogin: Function
  };

  handleSubmit = (event: Object) => {
    event.preventDefault();
    this.props.spotifyWebLogin();
  };

  handleLogin = () => {
    if (SpotifyWebClient.isAuthenticated()) {
      this.context.router.push('/main');
    }
  };

  componentWillMount() {
    this.handleLogin();
  }

  componentDidUpdate() {
    this.handleLogin();
  }

  renderState() {
    if (this.props.loginState === 'STARTED') {
      return (
        <Spinner className="pt-large margin-top-10"/>
      );
    }
    if (this.props.loginError) {
      return (
        <div className="pt-callout pt-intent-danger margin-top-10">
          {this.props.loginError}
        </div>
      );
    }
  }

  render() {
    return (
      <div className={`row text-align-center full-height ${styles.loginContainer}`}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Button
              type="submit"
              className="pt-fill pt-intent-primary pt-large"
              disabled={this.props.loginState === 'STARTED'}
            >Login</Button>
            {this.renderState()}
          </form>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Login.propTypes = {
  spotifyWebLogin: React.PropTypes.func.isRequired,
  loginState: React.PropTypes.string.isRequired,
  loginError: React.PropTypes.string
};

