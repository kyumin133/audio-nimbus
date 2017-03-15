import React from "react";
import EmailEntry from "./email_entry";
import UserAuthContainer from "./user_auth_container";
import { withRouter } from 'react-router';

class UserAuthMain extends React.Component {
  constructor(props) {
    super(props);
    this.setForm = this.setForm.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      formToRender: "EmailEntry",
      email: ""
    }
    this.firstLoad = this.props.firstLoad;
  }

  setForm(form, email = "") {
    this.setState({formToRender: form, email: email});
    // console.log(this.state);
  }

  login() {
    this.props.handleCloseModal();
    this.props.router.push("/home");
  }

  render() {
    let firstLoad = false;
    if (this.firstLoad) {
      this.firstLoad = false;
      firstLoad = true;
    }

    let form;
    switch(this.state.formToRender) {
      case "Login":
        form = <UserAuthContainer formType="login" login={this.login} setForm={this.setForm} email={this.state.email}></UserAuthContainer>;
        break;
      case "Signup":
        form = <UserAuthContainer formType="signup" login={this.login} setForm={this.setForm} email={this.state.email}></UserAuthContainer>;
        break;
      default:
        form = <EmailEntry setForm={this.setForm} email={this.state.email} firstLoad={firstLoad}></EmailEntry>;
    }

    return  <div className="modal" onClick={this.props.handleCloseModal}>
              {form}
            </div>
  }
}

export default withRouter(UserAuthMain);
