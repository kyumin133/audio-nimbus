import sessionReducer from './session_reducer';
import trackReducer from './track_reducer';
import commentReducer from './comment_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  session: sessionReducer,
  trackInfo: trackReducer,
  comments: commentReducer
});

export default rootReducer;
