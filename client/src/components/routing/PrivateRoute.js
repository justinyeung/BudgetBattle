import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import BackButton from '../layout/BackButton';

const PrivateRoute = ({
    user: { user, userLoading },
    component: Component,
    ...rest
}) => {
    return (
        <div>
            <BackButton />
            {user !== null && (
                <Route {...rest} render={(props) => <Component {...props} />} />
            )}
            {!userLoading && user === null && <Redirect to="/login" />}
        </div>
    );
};

PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
