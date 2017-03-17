import { connect } from "react-redux";
import TrackDetails from "./track_details";

const mapStateToProps = (state, ownProps) => {
  let track = state.trackInfo.tracks[0];
  for (let i = 0; i < state.trackInfo.tracks.length; i++) {
    if (ownProps.params.trackId === state.trackInfo.tracks[i]) {
      track = state.trackInfo.tracks[i];
      break;
    }
  }
  return {
    track: track
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetails);
