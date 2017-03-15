import React from "react";
import HomeBeforeLogin from "./home_before_login";
import HomeAfterLogin from "./home_after_login";

class Home extends React.Component {
  render() {
    console.log(window.currentUser);
    if (window.currentUser) {
      return < HomeAfterLogin />;
    } else {
      return < HomeBeforeLogin />;
    }
  }
}

export default Home;
