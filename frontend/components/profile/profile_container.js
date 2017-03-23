import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../actions/user_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.session.currentUser.id,
    user: state.user,
    errors: state.user.errors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (userId, user) => dispatch(updateUser(userId, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
