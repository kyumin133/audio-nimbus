
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from "./app";
import HomeBeforeLogin from "./home_before_login";
import HomeAfterLogin from "./home_after_login";

const Root = ({ store }) => {
  let Home = (window.currentUser) ? HomeAfterLogin : HomeBeforeLogin;
  return <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App } loggedIn={ !!window.currentUser }  >
        <IndexRoute component={ Home } />
        <Route path="home" component={ HomeAfterLogin } onEnter={ _ensureLoggedIn }/>
        <Route path="login" component={ HomeBeforeLogin } onEnter={ _redirectIfLoggedIn }/>
      </Route>
    </Router>
  </Provider>
};

const _redirectIfLoggedIn = (nextState, replace) => {
  if (window.currentUser) {
    console.log("go home");
    replace({ nextPathName: nextState.location.pathname }, '/home')
  }
}

const _ensureLoggedIn = (nextState, replace) => {
  if (!window.currentUser) {
    console.log("go /");
    replace({ nextPathName: nextState.location.pathname }, '/')
  }
}

export default Root;
