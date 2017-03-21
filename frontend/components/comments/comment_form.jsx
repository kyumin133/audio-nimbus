import React from "react";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      commentText: ""
    }
  }

  handleChange(e) {
    this.setState({ commentText: e.currentTarget.value });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      let formData = new FormData();
      formData.append("comment[commentable_type]", this.props.commentType);
      formData.append("comment[commentable_id]", this.props.commentableId);
      formData.append("comment[text]", this.state.commentText);
      formData.append("comment[commenter_id]", this.props.userId);
      this.props.createComment(formData).then(() => {
          this.setState({
            commentText: ""
          });
        }
      );
    }
  }

  render() {
    return  <div className="comment-form-div">
              <form className="comment-form" onSubmit={this.handleSubmit}>
                <div className="comment-left">
                  <div className="comment-img-wrapper">
                    <img src={this.props.imageUrl} className="comment-img"></img>
                  </div>
                  <div className="comment-content">
                    <input autoFocus type="text" value={this.state.commentText} className="comment-input" onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder="Write a comment"></input>
                  </div>
                </div>
              </form>
            </div>
  }
}

export default CommentForm;
