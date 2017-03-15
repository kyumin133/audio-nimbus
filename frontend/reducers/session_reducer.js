import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from "../actions/session_actions";
import merge from 'lodash/merge';

const initialState = {
  currentUser: null,
  errors: []
}
const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      window.currentUser = action.user;
      newState = merge({}, state);
      newState.currentUser = action.user;
      newState.errors = [];
      return newState;
    case RECEIVE_ERRORS:
      newState = merge({}, state);
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};



export default sessionReducer;
