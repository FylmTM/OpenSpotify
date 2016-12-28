// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Main } from "../components/main/Main";
import { playerPlay, playerStop } from "../actions/player";
import { spotifyWebLogout } from "../actions/spotifyWebAuthentication";
import { spotifyLibLoginWithSavedCredentials } from "../actions/spotifyLibAuthentication";

function mapStateToProps(state) {
  return {
    player: {
      authState: state.spotifyLibAuthentication.authState,
      enabled: state.spotifyLibAuthentication.loggedIn
    }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {playerPlay, playerStop, spotifyWebLogout, spotifyLibLoginWithSavedCredentials},
    dispatch
  );
}

// $FlowFixMe: IntelliJ got crazy
export default connect(mapStateToProps, mapDispatchToProps)(Main);
