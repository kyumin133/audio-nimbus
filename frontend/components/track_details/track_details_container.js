import { connect } from "react-redux";
import { fetchTrack, playPauseTrack, updateTrack } from "../../actions/track_actions";
import TrackDetails from "./track_details";

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.trackInfo.track,
    currentTrack: state.trackInfo.currentTrack,
    currentTrackPlaying: state.trackInfo.currentTrackPlaying,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
    playPauseTrack: (track) => dispatch(playPauseTrack(track)),
    updateTrack: (trackId, track) => dispatch(updateTrack(trackId, track))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetails);
