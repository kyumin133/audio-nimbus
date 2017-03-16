import { connect } from "react-redux";
import { login, logout } from "../../actions/session_actions";
import { stopCurrentTrack } from "../../actions/track_actions";
import NavBar from "./nav_bar";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => {
      return dispatch(login(user));
    },
    logout: () => {
      return dispatch(logout());
    },
    stopTrack: () => {
      return dispatch(stopCurrentTrack());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
