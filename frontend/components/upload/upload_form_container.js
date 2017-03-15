import { connect } from "react-redux";
// import { logout } from "../../actions/session_actions";
import UploadForm from "./upload_form";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);
