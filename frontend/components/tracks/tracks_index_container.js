import { connect } from "react-redux";
import { playPauseTrack, fetchTracks } from "../../actions/track_actions";
import TrackIndex from "./tracks_index";

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.trackInfo.tracks,
    errors: state.trackInfo.errors,
    currentTrack: state.trackInfo.currentTrack,
    currentTrackPlaying: state.trackInfo.currentTrackPlaying
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTracks: (userId) => dispatch(fetchTracks(userId)),
    playPauseTrack: (track) => dispatch(playPauseTrack(track))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndex);
