import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT, RECEIVE_ERRORS } from "../actions/comment_actions";
import merge from 'lodash/merge';

const initialState = [];

const commentReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = state.slice();

  switch (action.type) {
    case RECEIVE_COMMENTS:
      newState = action.comments;
      return newState;
    case RECEIVE_COMMENT:
      let index = -1;
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.comment.id) {
          index = i;
          break;
        }
      }

      if (newState.length === 0) {
        newState = [action.comment];
      } else if (index = -1) {
        newState.unshift(action.comment);
      } else {
        newState[index] = action.comment;
      }

      return newState;
    case REMOVE_COMMENT:
      index = -1;
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.comment.id) {
          index = i;
          break;
        }
      }
      if ((index === -1) || (newState.length === 0)) {
        return newState;
      }
      newState = newState.splice(index, 1);
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};



export default commentReducer;
