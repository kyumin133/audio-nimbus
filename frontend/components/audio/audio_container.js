import { connect } from "react-redux";
import { playPauseTrackFromAudio, playPauseTrack, receiveCurrentTime } from "../../actions/track_actions";
import Audio from "./audio";

const mapStateToProps = (state, ownProps) => {
  let track = state.trackInfo.currentTrack;
  let trackIndex = -1;
  if ((!!track) && (!!state.trackInfo.allTracks)) {
    for (let i = 0; i < state.trackInfo.allTracks.length; i++) {
      if (state.trackInfo.allTracks[i].id === track.id) {
        trackIndex = i;
        break;
      }
    }
  }
  return {
    track: track,
    trackIndex: trackIndex,
    tracks: state.trackInfo.allTracks,
    paused: !state.trackInfo.currentTrackPlaying
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    playPauseTrackFromAudio: (paused) => dispatch(playPauseTrackFromAudio(paused)),
    playPauseTrack: (track) => dispatch(playPauseTrack(track)),
    updateCurrentTime: (currentTime) => dispatch(receiveCurrentTime(currentTime))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
