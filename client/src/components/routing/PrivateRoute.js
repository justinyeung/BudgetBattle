import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { getUser } from '../../actions/userActions';
import Home from '../../components/pages/Home';


const PrivateRoute = ({ user: { user }, getUser }) => {
    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div>
            {user === null ? (
                <Redirect to='/login' />
            ) : (
                <Home />
            )}
        </div>
    )
}

PrivateRoute.propTypes = {
    getUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUser })(PrivateRoute);