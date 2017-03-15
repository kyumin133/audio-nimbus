import React from "react";

class HomeAfterLogin extends React.Component {
  render() {
    return <div className="home-body">
      <div className="margin-div"></div>
      <div className="main-div">
        <div className="background"></div>
        <div className="home-caption">
          <h1>Welcome, {window.currentUser.username}.</h1>
        </div>
      </div>
      <div className="margin-div"></div>
    </div>
  }
}

export default HomeAfterLogin;
