import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
