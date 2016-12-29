// @flow
import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import { SpotifyLibClient } from '../../../api/SpotifyLibClient';

export class SpotifyLibConfiguration extends Component {
  props: {
    state: {
      loggedIn: boolean,
      authState: string,
      error: ?string
    },
    login: Function,
    logout: Function
  };
  state: {
    initialized: boolean,
    login: string,
    password: string,
    error: string | boolean
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      initialized: false,
      login: '',
      password: '',
      error: false
    };
  }

  handleLoginType = (event: Object) => {
    this.setState({ login: event.target.value });
  };

  handlePasswordType = (event: Object) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = (event: Object) => {
    event.preventDefault();
    this.props.login(this.state.login, this.state.password);
  };

  handleLogout = (event: Object) => {
    event.preventDefault();
    this.props.logout();
  };

  handleDelete = (event: Object) => {
    event.preventDefault();
    this.props.logout();
    SpotifyLibClient.deleteCredentials();
    this.setState({
      login: '',
      password: ''
    });
  };

  componentDidMount() {
    SpotifyLibClient.getCredentials()
      .then((credentials) => {
        this.setState({
          initialized: true,
          error: false,
          login: credentials.login,
          password: credentials.password
        });
      })
      .catch((error) => {
        this.setState({
          initialized: false,
          error: error.toString()
        });
      });
  }

  componentWillUnmount() {
    this.setState({
      initialized: false,
      login: '',
      password: '',
      error: false
    });
  }

  render() {
    return (
      <div>
        <h3>Libspotify</h3>
        <div className="pt-callout pt-intent-primary pt-icon-info-sign">
          Playback functionality is powered by Libspotify (native extension created by Spotify).<br/>
          <b>Premium</b> account is required.<br/>
          Credentials are securely stored in OS-specific keychain.<br/>
          Use your usual Spotify credentials. If you are using Facebook login, then use Facebook credentials.
        </div>
        {this.renderState()}
        {this.renderForm()}
      </div>
    );
  }

  renderState() {
    if (this.props.state.loggedIn) {
      return (
        <div className="pt-callout pt-intent-success margin-top-5">Connected.</div>
      );
    }
    switch (this.props.state.authState) {
      case 'LOGIN_STARTED':
        return (
          <div className="pt-callout margin-top-5">
            Connecting...
          </div>
        );
      case 'LOGOUT_STARTED':
        return (
          <div className="pt-callout margin-top-5">
            Disconnecting...
          </div>
        );
      case 'LOGIN_ERROR':
      case 'LOGOUT_ERROR':
        return (
          <div className="pt-callout pt-intent-danger margin-top-5">
            {this.props.state.error}
          </div>
        );
      default:
        // Means we are not logged in, we don't have success and don't have error.
        return (
          <div className="pt-callout margin-top-5">
            Disconnected.
          </div>
        );
    }
  }

  renderForm() {
    if (this.state.error) {
      return (
        <div className="pt-callout pt-intent-danger margin-top-5">
          {this.state.error}
        </div>
      );
    }
    if (this.state.initialized) {
      return (
        <div className="pt-control-group margin-top-5">
          <input
            className="pt-input" type="text" placeholder="Login"
            value={this.state.login}
            onChange={this.handleLoginType}
          />
          <input
            className="pt-input" type="password" placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordType}
          />
          <button className="pt-button pt-intent-primary" type="button" onClick={this.handleLogin}>Login</button>
          <button className="pt-button" type="button" onClick={this.handleLogout}>Logout</button>
          <button className="pt-button pt-intent-danger" type="button" onClick={this.handleDelete}>Delete</button>
        </div>
      );
    } else {
      return (
        <Spinner className="pt-small margin-top-5"/>
      );
    }
  }
}

SpotifyLibConfiguration.propTypes = {
  state: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
};
