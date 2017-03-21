import { connect } from "react-redux";
import { fetchCommentsByUser, fetchCommentsByTrack } from "../../actions/comment_actions";
import CommentsIndex from "./comments_index";

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let fetchComments;
  if (ownProps.commentType === "user") {
    fetchComments = (userId) => dispatch(fetchCommentsByUser(userId));
  } else {
    fetchComments = (trackId) => dispatch(fetchCommentsByTrack(trackId));
  }

  return {
    fetchComments: fetchComments
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndex);
