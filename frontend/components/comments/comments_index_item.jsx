import React from "react";
import javascript_time_ago from 'javascript-time-ago'

javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')
const time_ago_english = new javascript_time_ago('en-US')

class CommentsIndexItem extends React.Component {
  render() {
    let comment = this.props.comment;
    if (!comment) {
      return null;
    }
    return  <li className="comment-index-item">
              <div className="comment-left">
                <div className="comment-img-wrapper">
                  <img className="comment-img" src={comment.commenter.imageUrl}></img>
                </div>
                <div className="comment-content">
                  <span className="comment-username">{comment.commenter.username}</span>
                  <span className="comment-text">{comment.text}</span>
                </div>
              </div>
              <div className="comment-right">{time_ago_english.format(new Date(comment.updatedAt))}</div>
            </li>
  }
}

export default CommentsIndexItem;
