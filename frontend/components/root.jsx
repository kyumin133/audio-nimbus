
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from "./app";
import Home from "./home"
import HomeBeforeLogin from "./home_before_login";
import HomeAfterLogin from "./home_after_login";
import EditProfileFormContainer from "./edit_profile/edit_profile_form_container";
import UploadFormContainer from "./upload/upload_form_container";

const Root = ({ store }) => {
  return <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App } >
        <IndexRoute component={ Home } loggedIn={ !!window.currentUser }  />
        <Route path="home" component={ HomeAfterLogin } onEnter={ _ensureLoggedIn }/>
        <Route path="login" component={ HomeBeforeLogin } onEnter={ _redirectIfLoggedIn }/>
        <Route path="edit_profile" component={ EditProfileFormContainer } onEnter={ _ensureLoggedIn } />
        <Route path="upload" component={ UploadFormContainer } onEnter={ _ensureLoggedIn } />
      </Route>
    </Router>
  </Provider>
};

const _redirectIfLoggedIn = (nextState, replace) => {
  if (window.currentUser) {
    replace({ nextPathName: nextState.location.pathname }, '/home')
  }
}

const _ensureLoggedIn = (nextState, replace) => {
  if (!window.currentUser) {
    replace({ nextPathName: nextState.location.pathname }, '/login')
  }
}

export default Root;
