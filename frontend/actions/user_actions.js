import { receiveCurrentUser } from "./session_actions";
import UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const RECEIVE_PLAYING_USERNAME = "RECEIVE_PLAYING_USERNAME";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const receiveUserErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const receivePlayingUsername = (username) => ({
  type: RECEIVE_PLAYING_USERNAME,
  username
});

export const fetchUser = (userId) => (dispatch) => {
  return UserAPIUtil.fetchUser(userId).then(response => {
    return dispatch(receiveUser(response));
  }).fail(errors => {
    return dispatch(receiveUserErrors(JSON.parse(errors.responseText)));
  });
};

export const updateUser = (id, user) => (dispatch) => {
  return UserAPIUtil.updateUser(id, user).then(response => {
    dispatch(receivePlayingUsername(response.username));
    if (window.currentUser.id === id) {
      dispatch(receiveCurrentUser(response));
    }
    dispatch(receiveUser(response));
  }).fail(errors => {
    return dispatch(receiveUserErrors(errors.responseJSON));
  });
}
