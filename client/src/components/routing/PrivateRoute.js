import React from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// const PrivateRoute = ({ user: { user }, getUser }) => {
const PrivateRoute = ({ component: Component , ...rest }) => {

    return (
        <div>
            {!localStorage.getItem('isLoggedIn') ? (
                <Redirect to='/login' />
            ) : (
                <Route {...rest} render={Component} />
            )}
        </div>
    )
}

export default PrivateRoute;