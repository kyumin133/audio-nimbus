const CommentAPIUtil = {
  fetchCommentsByUser: (userId) => {
    return $.ajax({
      url: "api/comments",
      type: "GET",
      data: {
        commentable_type: "User",
        commentable_id: userId
      }
    });
  },

  fetchCommentsByTrack: (trackId) => {
    return $.ajax({
      url: "api/comments",
      type: "GET",
      data: {
        commentable_type: "Track",
        commentable_id: trackId
      }
    });
  },

  fetchComment: (commentId) => {
    return $.ajax({
      url: `api/comments/${commentId}`,
      type: "GET",
    });
  },

  createComment: (comment) => {
    // console.log(comment);
    return $.ajax({
      url: "api/comments",
      type: "POST",
      data: comment,
      processData: false,
      contentType: false,
      dataType: 'json',
      error: (error) => {
        console.log(error.responseText);
      }
    });
  },

  updateComment: (id, comment) => {
    return $.ajax({
      url: `api/comments/${id}`,
      type: "PATCH",
      data: comment,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
  }
};

export default CommentAPIUtil;
