import { connect } from "react-redux";
import { playTrack } from "../../actions/track_actions";
import Audio from "./audio";

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.trackInfo.currentTrack,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    playTrack: () => dispatch(playTrack())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
