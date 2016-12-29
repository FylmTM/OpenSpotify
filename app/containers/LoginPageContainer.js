// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Login } from '../components/login/Login';
import { spotifyWebLogin } from '../actions/spotifyWebAuthentication';

function mapStateToProps(state) {
  return {
    loginState: state.spotifyWebAuthentication.loginState,
    loginError: state.spotifyWebAuthentication.loginError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ spotifyWebLogin }, dispatch);
}

// $FlowFixMe: IntelliJ got crazy
export default connect(mapStateToProps, mapDispatchToProps)(Login);
