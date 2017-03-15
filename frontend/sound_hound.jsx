import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { login } from './actions/session_actions';

import SessionAPIUtil from './util/session_api_util';

import configureStore from './store/store';
import AWS from 'aws-sdk';


document.addEventListener('DOMContentLoaded', () => {
  // let myConfig = new AWS.Config();
  // myConfig.update({region: 'us-west-1'});
  let store = {};

  let preloadedState =  {
                            session: {
                              currentUser: window.currentUser,
                              errors: []
                            }
                          };
  if (window.currentUser !== undefined)
    store = configureStore(preloadedState);
  else {
    store = configureStore();
  }
  const root = document.getElementById('root');
  window.store = store;
  window.login = login;
  window.SessionAPIUtil = SessionAPIUtil;

  ReactDOM.render(<Root store={ store }/>, root);
});
