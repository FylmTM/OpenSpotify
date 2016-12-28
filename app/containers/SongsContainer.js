// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Songs } from "../components/songs/Songs";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

// $FlowFixMe: IntelliJ got crazy
export default connect(mapStateToProps, mapDispatchToProps)(Songs);
