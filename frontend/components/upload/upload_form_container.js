import { connect } from "react-redux";
import { createTrack } from "../../actions/track_actions";
import UploadForm from "./upload_form";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    uploading: state.trackInfo.uploading,
    errors: state.trackInfo.errors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createTrack: (track) => {
      return dispatch(createTrack(track));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);
