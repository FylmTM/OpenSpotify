// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { ApplicationState } from '../store/types';
import { Configuration } from '../components/configuration/Configuration';
import { spotifyLibLogin, spotifyLibLogout } from '../actions/spotifyLibAuthentication';

function mapStateToProps(state: ApplicationState) {
  return {
    spotifyLibState: {
      loggedIn: state.spotifyLibAuthentication.loggedIn,
      authState: state.spotifyLibAuthentication.authState,
      error: state.spotifyLibAuthentication.error,
    }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ spotifyLibLogin, spotifyLibLogout }, dispatch);
}

// $FlowFixMe: IntelliJ got crazy
export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
