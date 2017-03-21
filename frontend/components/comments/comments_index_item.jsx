import React from "react";

class CommentsIndexItem extends React.Component {
  render() {
    let comment = this.props.comment;
    if (!comment) {
      return null;
    }
    return  <li className="comments-index">
              <img className="audio-img" src={comment.commenter.imageUrl}></img>
              {comment.text}
              -
              {comment.commenter.username}
              -
              {comment.updatedAt}
            </li>
  }
}

export default CommentsIndexItem;
