import React, { Fragment } from "react";
import "./App.css";

import "typeface-roboto";
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import Dashboard from "./pages/Dashboard";
import FriendsPage from "./pages/FriendsPage";
import PurchasesPage from "./pages/PurchasesPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import CurrentCompPage from "./pages/CurrentCompPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Fragment>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/getstarted" component={GetStartedPage} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/friends" component={FriendsPage} />
            <PrivateRoute path="/purchases" component={PurchasesPage} />
            <PrivateRoute
              exact
              path="/competitions"
              component={CompetitionsPage}
            />
            <PrivateRoute
              path="/competitions/user"
              component={CurrentCompPage}
            />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
