import React from "react";
import CommentsIndexItem from "./comments_index_item";

class CommentsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchComments(this.props.commentableId);
  }
  componentWillReceiveProps(newProps) {
    if (this.props.commentableId !== newProps.commentableId) {
      this.props.fetchComments(newProps.commentableId);
    }
  }

  render() {
    if (this.props.comments === undefined) {
      return null;
    }
    if (this.props.comments.length === 0) {
      return null;
    }

    // console.log(this.props.comments);
    if (Object.keys(this.props.comments).length === 0) {
      return null;
    }

    let commentsArr = this.props.comments.map((comment, idx) => {
      return <CommentsIndexItem key={comment.id} comment={comment}></CommentsIndexItem>;
    });
    return <ul className="comment-index">{commentsArr}</ul>;
  }
}

export default CommentsIndex;
