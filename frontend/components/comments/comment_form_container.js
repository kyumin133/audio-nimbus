import { connect } from "react-redux";
import { createComment } from "../../actions/comment_actions"
import CommentForm from "./comment_form";

const mapStateToProps = (state, ownProps) => {
  return {
    imageUrl: state.session.currentUser.imageUrl,
    userId: state.session.currentUser.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createComment: (comment) => dispatch(createComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
