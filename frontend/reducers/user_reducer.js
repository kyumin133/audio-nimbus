import { RECEIVE_USER, RECEIVE_ERRORS } from "../actions/user_actions";
import merge from 'lodash/merge';

const initialState = {};

const userReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USER:
      newState = action.user;
      newState.errors = [];
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};



export default userReducer;
