import React, { Fragment } from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import PrivateRoute from './components/routing/PrivateRoute';

import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Competitions from './components/subpages/Competitions';

function App() {
  return (
    <Provider store={store}>
      <Router>
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
