import React from "react";
import javascript_time_ago from 'javascript-time-ago';
import { Link } from "react-router";

javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')
const time_ago_english = new javascript_time_ago('en-US')

class CommentsIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.select = this.select.bind(this);
    this.delete = this.delete.bind(this);
    this.editText = this.editText.bind(this);
    this.saveText = this.saveText.bind(this);
    this.cancelEdits = this.cancelEdits.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      text: "",
      savedText: "",
      editing: false,
      error: ""
    }
  }

  select(e) {
    e.currentTarget.select();
  }

  cancelEdits() {
    this.setState({
      editing: false,
      text: this.state.savedText,
      error: ""
    })
  }

  editText() {
    this.setState({
      text: this.props.comment.text,
      editing: true
    });
  }

  handleTextChange(e) {
    let error = ""
    if (e.currentTarget.value.length === 0) {
      error = "Comment can't be blank"
    }
    this.setState({
      text: e.currentTarget.value,
      error: error
    })
  }

  saveText(e) {
    if (this.state.text.length === 0) {
      this.cancelEdits();
      return;
    }
    let formData = new FormData();
    let comment = this.props.comment;
    console.log(comment);
    formData.append("comment[commentable_type]", comment.commentableType);
    formData.append("comment[commentable_id]", comment.commentableId);
    formData.append("comment[text]", this.state.text);
    formData.append("comment[commenter_id]", this.props.userId);
    this.props.updateComment(comment.id, formData).then(() => {
      this.setState({
        editing: false,
        savedText: this.state.text,
        error: ""
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
        if (this.state.error.length > 0) {
          commentText = <input className="comment-input-error" type="text" autoFocus onFocus={this.select} value={this.state.text} onKeyPress={this.handleKeyPress} onChange={this.handleTextChange} onBlur={this.saveText}></input>;
        } else {
          commentText = <input className="comment-input" type="text" autoFocus onFocus={this.select} value={this.state.text} onKeyPress={this.handleKeyPress} onChange={this.handleTextChange} onBlur={this.saveText}></input>;
        }
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
                  <Link className="img-link" to={`profile/${comment.commenter.id}`} ><div className="comment-img" style={{ backgroundImage: `url(${comment.commenter.imageUrl})`}}></div></Link>
                </div>
                <div className="comment-content">
                  <span className="comment-username"><Link to={`profile/${comment.commenter.id}`} >{comment.commenter.username}</Link></span>
                  {commentText}
                </div>
              </div>
              <div className="comment-right">{time_ago_english.format(new Date(comment.updatedAt))}</div>
              {commentOverlay}
            </li>
  }
}

export default CommentsIndexItem;
