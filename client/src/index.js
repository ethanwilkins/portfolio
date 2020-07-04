import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import App from './components/App';
import createStore from './store';
import setAuthToken from './setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';

import './styles/index.scss';
import 'font-awesome/css/font-awesome.min.css';

// Initializes time ago locale for react-time-ago
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.addLocale(en);

const store = createStore();

// Code snippet from Krunal
// https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/#React_Redux_Node_MongoDB_JWT_Authentication
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
// unregistering web worker temporarily to prevent browser caching
unregister();
