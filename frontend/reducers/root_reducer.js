import sessionReducer from './session_reducer';
import trackReducer from './track_reducer';
import commentReducer from './comment_reducer';
import userReducer from './user_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  session: sessionReducer,
  trackInfo: trackReducer,
  comments: commentReducer,
  user: userReducer
});

export default rootReducer;
