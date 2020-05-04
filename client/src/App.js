import React, { Fragment } from 'react';
import './App.css';

import 'typeface-roboto';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import PrivateRoute from './components/routing/PrivateRoute';

import Navbar from './components/layout/Navbar';
import LoginPage from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import FriendsPage from './components/pages/FriendsPage';
import CompetitionsPage from './components/pages/CompetitionsPage';
import CurrentCompPage from './components/pages/CurrentCompPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Fragment>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute path='/friends' component={FriendsPage} />
            <PrivateRoute exact path='/competitions' component={CompetitionsPage} />
            <PrivateRoute path='/competitions/user' component={CurrentCompPage} />
            <Route exact path='/login' component={LoginPage} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
