import React from "react";
import SessionAPIUtil from "../../util/session_api_util";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.returnToEmailEntry = this.returnToEmailEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: this.props.email,
      password: "",
      errors: []
    }
  }

  update(id) {
    return (e) => {
      this.setState({[id]: e.target.value})
    }
  }

  returnToEmailEntry() {
    this.props.setForm("EmailEntry", this.state.email)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state, this.props.formType).then(() => {}).fail(() => {
      this.setState({errors: this.props.errors})
    });
  }

  render() {
    let action = (this.props.formType === "signup") ? "Sign Up" : "Log In"
    let errors = "";
    let passwordClass = "box";
    if (this.state.errors.length > 0) {
      let errorArr = this.state.errors.map((error, i) => {
        return <li key={i}>{error}</li>
      });
      errors = <ul className="error-ul">{errorArr}</ul>;
      passwordClass = "error-box";
    }
    return  <div className="auth-div" onClick={(e) => {e.stopPropagation();}}>
              <form onSubmit={this.handleSubmit}>
                <span className="email-container box" onClick={this.returnToEmailEntry}>
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  <span className="email">{this.state.email}</span>
                </span>
                <input className={passwordClass} autoFocus type="password" value={this.state.password} placeholder="Your password" onChange={this.update("password")}></input>
                {errors}
                <button type="submit">{action}</button>
              </form>
            </div>;
  }
}

export default SessionForm;
