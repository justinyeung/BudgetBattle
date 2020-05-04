import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getUser } from '../../actions/userActions';

const PrivateRoute = ({ getUser, user: { user }, component: Component , ...rest }) => {

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            {!localStorage.getItem('isLoggedIn') || user === null ? (
                <Redirect to='/login' />
            ) : (
                <Route {...rest} render={Component} />
            )}
        </div>
    )
}

PrivateRoute.propTypes = {
    getUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
  })

export default connect(mapStateToProps, { getUser })(PrivateRoute);