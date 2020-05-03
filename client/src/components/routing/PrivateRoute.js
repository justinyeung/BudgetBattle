import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getUser } from '../../actions/userActions';
import Home from '../../components/pages/Home';


const PrivateRoute = ({ user: { user }, getUser }) => {
    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            {user !== null ? (
                <Home />
            ) : (
                <Redirect to='/login' />
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