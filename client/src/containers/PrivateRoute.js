import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUser, setUserLoading } from '../actions/userActions';
import { getPurchases, setPurchaseLoading } from '../actions/purchaseActions';
import {
    getAcceptedComps,
    getInPendingComp,
    setCompLoading,
} from '../actions/competitionActions';

import NavButtons from '../components/layout/NavButtons';

const PrivateRoute = ({
    getUser,
    getPurchases,
    getAcceptedComps,
    getInPendingComp,
    setUserLoading,
    setPurchaseLoading,
    setCompLoading,
    user: { user, userLoading },
    component: Component,
    ...rest
}) => {
    return (
        <div>
            <div className="nav-btns">
                <NavButtons
                    getUser={getUser}
                    getPurchases={getPurchases}
                    getAcceptedComps={getAcceptedComps}
                    getInPendingComp={getInPendingComp}
                    setUserLoading={setUserLoading}
                    setPurchaseLoading={setPurchaseLoading}
                    setCompLoading={setCompLoading}
                />
            </div>
            {user !== null && (
                <Route {...rest} render={(props) => <Component {...props} />} />
            )}
            {!userLoading && user === null && <Redirect to="/login" />}
        </div>
    );
};

PrivateRoute.propTypes = {
    getUser: PropTypes.func.isRequired,
    getPurchases: PropTypes.func.isRequired,
    getAcceptedComps: PropTypes.func.isRequired,
    getInPendingComp: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
    setPurchaseLoading: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {
    getUser,
    getPurchases,
    getAcceptedComps,
    getInPendingComp,
    setUserLoading,
    setPurchaseLoading,
    setCompLoading,
})(PrivateRoute);
