import sessionReducer from './session_reducer';
import trackReducer from './track_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  session: sessionReducer,
  trackInfo: trackReducer
});

export default rootReducer;
