import { connect } from "react-redux";
import { createTrack } from "../../actions/track_actions";
import UploadForm from "./upload_form";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createTrack: (track) => {
      dispatch(createTrack(track));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);
