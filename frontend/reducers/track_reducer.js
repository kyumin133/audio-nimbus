import { RECEIVE_PLAY_TRACK, RECEIVE_TRACKS, RECEIVE_TRACK, REMOVE_TRACK, RECEIVE_ERRORS } from "../actions/track_actions";
import merge from 'lodash/merge';

const initialState = {
  tracks: [],
  errors: [],
  currentTrack: null
}
const trackReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);;
  switch (action.type) {
    case RECEIVE_PLAY_TRACK:
      newState.currentTrack = action.track;
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
