import CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment
});

export const removeComment = (comment) => ({
  type: REMOVE_COMMENT,
  comment
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const fetchCommentsByUser = (userId) => (dispatch) => {
  return CommentAPIUtil.fetchCommentsByUser(userId).then(response => {
    return dispatch(receiveComments(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
};

export const fetchCommentsByTrack = (trackId) => (dispatch) => {
  return CommentAPIUtil.fetchCommentsByTrack(trackId).then(response => {
    return dispatch(receiveComments(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
};

export const fetchComment = (comment) => (dispatch) => {
  return CommentAPIUtil.fetchComment(comment).then(response => {
    return dispatch(receiveComment(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
};

export const createComment = (comment) => (dispatch) => {
  return CommentAPIUtil.createComment(comment).then(response => {
    dispatch(receiveComment(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
}

export const deleteComment = (commentId) => (dispatch) => {
  return CommentAPIUtil.deleteComment(commentId).then(response => {
    dispatch(removeComment(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
}

export const updateComment = (id, comment) => (dispatch) => {
  return CommentAPIUtil.updateComment(id, comment).then(response => {
    dispatch(receiveComment(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
}
