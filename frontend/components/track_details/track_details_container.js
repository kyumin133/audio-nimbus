import { connect } from "react-redux";
import { fetchTrack, playPauseTrack, updateTrack, receiveCurrentTimeByPos } from "../../actions/track_actions";
import TrackDetails from "./track_details";

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.trackInfo.track,
    currentTrack: state.trackInfo.currentTrack,
    currentTrackPlaying: state.trackInfo.currentTrackPlaying,
    userId: state.session.currentUser.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
    playPauseTrack: (track) => dispatch(playPauseTrack(track)),
    updateTrack: (trackId, track) => dispatch(updateTrack(trackId, track)),
    updateCurrentTimeByPos: (currentPos) => dispatch(receiveCurrentTimeByPos(currentPos))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetails);
