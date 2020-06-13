import React from 'react';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import withAnalytics, { initAnalytics } from 'react-with-analytics';

import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import SettingsPage from '../containers/SettingsPage';
import SignupPage from '../containers/SignupPage';
import AdminPage from '../containers/AdminPage';
import BlogPage from '../containers/BlogPage';
import PostPage from '../containers/PostPage';
import EditPage from '../containers/EditPage';
import NotFound from './NotFound';

initAnalytics('UA-126201794-1');
export const history = createBrowserHistory();

const Root = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/dev" component={AdminPage} />
    <Route path="/blog" component={BlogPage} />
    <Route path="/post/:prettyId" component={PostPage} />
    <Route path="/edit_post/:prettyId" component={EditPage} />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
