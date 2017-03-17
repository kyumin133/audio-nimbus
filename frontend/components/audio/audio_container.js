import { connect } from "react-redux";
import { playPauseTrackFromAudio } from "../../actions/track_actions";
import Audio from "./audio";

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.trackInfo.currentTrack,
    paused: !state.trackInfo.currentTrackPlaying
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    playPauseTrackFromAudio: (paused) => dispatch(playPauseTrackFromAudio(paused))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
