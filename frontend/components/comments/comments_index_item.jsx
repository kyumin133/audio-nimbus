import React from "react";
import javascript_time_ago from 'javascript-time-ago'

javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')
const time_ago_english = new javascript_time_ago('en-US')

class CommentsIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.editText = this.editText.bind(this);
    this.saveText = this.saveText.bind(this);
    this.cancelEdits = this.cancelEdits.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      text: "",
      editing: false
    }
  }

  cancelEdits() {
    this.setState({
      editing: false
    })
  }

  editText() {
    this.setState({
      text: this.props.comment.text,
      editing: true
    });
  }

  handleTextChange(e) {
    this.setState({
      text: e.currentTarget.value
    })
  }

  saveText(e) {
    let formData = new FormData();
    let comment = this.props.comment;
    console.log(comment);
    formData.append("comment[commentable_type]", comment.commentableType);
    formData.append("comment[commentable_id]", comment.commentableId);
    formData.append("comment[text]", this.state.text);
    formData.append("comment[commenter_id]", this.props.userId);
    this.props.updateComment(comment.id, formData).then(() => {
      this.setState({
        editing: false
      });
    });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.saveText(e);
    }
  }

  delete() {
    this.props.deleteComment(this.props.comment.id);
  }

  render() {
    let comment = this.props.comment;
    if (!comment) {
      return null;
    }

    let deleteIcon = "";
    let commentOverlay = "";
    let commentText = <span className="comment-text">{comment.text}</span>;
    if (comment.commenter.id === this.props.userId) {
      deleteIcon = <span className="delete-comment" onClick={this.delete}><i className="fa fa-trash-o" aria-hidden="true"></i></span>;
      commentOverlay = <div className="comment-overlay">{deleteIcon}</div>;

      if (this.state.editing) {
        commentText = <input className="comment-input" type="text" autoFocus value={this.state.text} onKeyPress={this.handleKeyPress} onChange={this.handleTextChange} onBlur={this.cancelEdits}></input>;
      } else {
        commentText = <div className="comment-text-editable-wrapper">
                        <span className="comment-text-editable">{comment.text}</span>
                        <div className="comment-text-overlay" onClick={this.editText}>
                          <span className="edit-comment">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>;
      }

    }
    return  <li className="comment-index-item">
              <div className="comment-left">
                <div className="comment-img-wrapper">
                  <img className="comment-img" src={comment.commenter.imageUrl}></img>
                </div>
                <div className="comment-content">
                  <span className="comment-username">{comment.commenter.username}</span>
                  {commentText}
                </div>
              </div>
              <div className="comment-right">{time_ago_english.format(new Date(comment.updatedAt))}</div>
              {commentOverlay}
            </li>
  }
}

export default CommentsIndexItem;
