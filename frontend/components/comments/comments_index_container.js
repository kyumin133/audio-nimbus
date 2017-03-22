import { connect } from "react-redux";
import { updateComment, fetchCommentsByUser, fetchCommentsByTrack, deleteComment } from "../../actions/comment_actions";
import CommentsIndex from "./comments_index";

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let fetchComments;
  if (ownProps.commentType === "User") {
    fetchComments = (userId) => dispatch(fetchCommentsByUser(userId));
  } else {
    fetchComments = (trackId) => dispatch(fetchCommentsByTrack(trackId));
  }

  return {
    fetchComments: fetchComments,
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    updateComment: (commentId, comment) => dispatch(updateComment(commentId, comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndex);
