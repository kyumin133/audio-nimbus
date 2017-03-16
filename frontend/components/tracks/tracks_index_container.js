import { connect } from "react-redux";
import { playTrack, fetchTracks } from "../../actions/track_actions";
import TrackIndex from "./tracks_index";

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.trackInfo.tracks,
    errors: state.trackInfo.errors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTracks: () => dispatch(fetchTracks()),
    playTrack: (track) => dispatch(playTrack(track))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndex);
