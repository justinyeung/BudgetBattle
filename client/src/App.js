import React, { Fragment } from 'react';
import './App.css';

import 'typeface-roboto';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import PrivateRoute from './components/routing/PrivateRoute';

import Login from './components/pages/Login';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Fragment>
          <Switch>
            <PrivateRoute exact path='/' />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
