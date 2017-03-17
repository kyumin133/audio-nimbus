import { RECEIVE_PLAY_PAUSE_TRACK_FROM_AUDIO, RECEIVE_PLAY_PAUSE_TRACK, STOP_CURRENT_TRACK, RECEIVE_TRACKS, RECEIVE_TRACK, REMOVE_TRACK, RECEIVE_ERRORS } from "../actions/track_actions";
import merge from 'lodash/merge';

const initialState = {
  tracks: [],
  errors: [],
  currentTrack: null,
  currentTrackPlaying: false
}
const trackReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);;
  switch (action.type) {
    case RECEIVE_PLAY_PAUSE_TRACK_FROM_AUDIO:
      newState.currentTrackPlaying = !newState.currentTrackPlaying;
      return newState;
    case RECEIVE_PLAY_PAUSE_TRACK:
      newState.currentTrack = action.track;
      if (state.currentTrack !== null) {
        if (state.currentTrack.id !== newState.currentTrack.id) {
          newState.currentTrackPlaying = true;
        } else {
          newState.currentTrackPlaying = !newState.currentTrackPlaying;
        }
      } else {
        newState.currentTrackPlaying = true;
      }
      // console.log(newState.currentTrackPlaying);
      return newState;
    case STOP_CURRENT_TRACK:
      newState.currentTrack = null;
      return newState;
    case RECEIVE_TRACKS:
      newState.tracks = action.tracks;
      return newState;
    case RECEIVE_TRACK:
      newState.tracks[action.track.id] = action.track;
      return newState;
    case REMOVE_TRACK:
      delete newState.tracks[action.track.id];
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};



export default trackReducer;
