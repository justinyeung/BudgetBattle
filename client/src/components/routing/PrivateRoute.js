import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { getUser, setUserLoading } from '../../actions/userActions';

const PrivateRoute = ({
    getUser,
    setUserLoading,
    user: { user, userLoading },
    component: Component,
    ...rest
}) => {
    useEffect(() => {
        setUserLoading();
        getUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {user !== null && (
                <Route {...rest} render={(props) => <Component {...props} />} />
            )}
            {!userLoading && user === null && <Redirect to="/login" />}
        </div>
    );
};

PrivateRoute.propTypes = {
    getUser: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { getUser, setUserLoading })(
    PrivateRoute
);
