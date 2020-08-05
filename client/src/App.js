import React, { Fragment } from 'react';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';

import PrivateRoute from './containers/PrivateRoute';
import Navbar from './containers/Navbar';
import LoginPage from './containers/Login';
import HomePage from './containers/Home';
import GetStartedPage from './containers/GetStarted';
import Dashboard from './containers/Dashboard';
import FriendsPage from './containers/Friends';
import PurchasesPage from './containers/Purchases';
import CompetitionsPage from './containers/Competitions';
import SummaryPage from './containers/Summary';
import Footer from './components/layout/Footer';
import ProfilePage from './containers/Profile';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/getstarted" component={GetStartedPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/profile/:id" component={ProfilePage} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <PrivateRoute path="/friends" component={FriendsPage} />
                        <PrivateRoute
                            path="/purchases"
                            component={PurchasesPage}
                        />
                        <PrivateRoute
                            exact
                            path="/battles"
                            component={CompetitionsPage}
                        />
                        <PrivateRoute
                            path="/battles/:id"
                            component={SummaryPage}
                        />
                    </Switch>
                </Fragment>
                <Footer />
            </Router>
        </Provider>
    );
};

export default App;
