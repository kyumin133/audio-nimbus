import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from "./app";
import HomeBeforeLogin from "./home_before_login";

const Root = ({ store }) => {

  return <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App } loggedIn={ !!window.currentUser } >
        <IndexRoute component={ HomeBeforeLogin } />
      </Route>
    </Router>
  </Provider>
};

const _redirectIfLoggedIn = (nextState, replace) => {
  if (window.currentUser) {
    replace({ nextPathName: nextState.location.pathname }, '/')
  }
}

const _ensureLoggedIn = (nextState, replace) => {
  if (!window.currentUser) {
    replace({ nextPathName: nextState.location.pathname }, '/login')
  }
}

export default Root;
