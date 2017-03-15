import React from "react";
import SessionAPIUtil from "../../util/session_api_util";
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class EmailEntry extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: this.props.email,
      error: "",
    }

    this.firstLoad = !!this.props.firstLoad;
  }

  update(id) {
    return (e) => {
      this.setState({[id]: e.target.value})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.email.match(emailRegex)) {
      this.setState({error: "Please enter a valid email address."});
      return;
    } else {
      this.setState({error: ""})
    }

    SessionAPIUtil.checkEmail(this.state.email).then(foundEmail => {
      if (foundEmail) {
        this.props.setForm("Login", this.state.email);
      } else {
        this.props.setForm("Signup", this.state.email);
      }
    });
  }

  render() {
    let error = this.state.error;
    let emailClass = "box";
    if (error.length > 0) {
      error = <div className="error">{error}</div>
      emailClass = "error-box";
    }
    let className = (this.props.firstLoad) ? "auth-div first-load" : "auth-div";

    return  <div className={className} onClick={(e) => {e.stopPropagation();}}>
              <form onSubmit={this.handleSubmit}>
                <input className={emailClass} autoFocus type="text" value={this.state.email} placeholder="Your email address" onChange={this.update("email")}></input>
                {error}
                <button type="submit">Continue</button>
              </form>
            </div>;
  }
}

export default EmailEntry;
