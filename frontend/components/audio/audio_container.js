import { connect } from "react-redux";
import { playPauseTrackFromAudio, playPauseTrack } from "../../actions/track_actions";
import Audio from "./audio";

const mapStateToProps = (state, ownProps) => {
  let track = state.trackInfo.currentTrack;
  let trackIndex = -1;
  if (!!track) {
    for (let i = 0; i < state.trackInfo.tracks.length; i++) {
      if (state.trackInfo.tracks[i].id === track.id) {
        trackIndex = i;
        break;
      }
    }
  }
  return {
    track: track,
    trackIndex: trackIndex,
    tracks: state.trackInfo.tracks,
    paused: !state.trackInfo.currentTrackPlaying
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    playPauseTrackFromAudio: (paused) => dispatch(playPauseTrackFromAudio(paused)),
    playPauseTrack: (track) => dispatch(playPauseTrack(track))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
