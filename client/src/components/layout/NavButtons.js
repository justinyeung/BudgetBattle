import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getUser, setUserLoading } from '../../actions/userActions';
import {
    getPurchases,
    setPurchaseLoading,
} from '../../actions/purchaseActions';
import {
    getAcceptedComps,
    getInPendingComp,
    setCompLoading,
} from '../../actions/competitionActions';

import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Button, Container } from '@material-ui/core';

const BackButton = ({
    getUser,
    getPurchases,
    getAcceptedComps,
    getInPendingComp,
    setUserLoading,
    setPurchaseLoading,
    setCompLoading,
    history,
}) => {
    const refresh = () => {
        setUserLoading();
        setPurchaseLoading();
        setCompLoading();
        getUser();
        getPurchases();
        getAcceptedComps();
        getInPendingComp();
    };

    return (
        <Container maxWidth="lg" className="nav-btns">
            <Button variant="contained" onClick={() => history.goBack()}>
                <KeyboardBackspaceRoundedIcon fontSize="large" /> Go Back
            </Button>
            <Button variant="contained" onClick={() => refresh()}>
                <RefreshIcon fontSize="large" /> Refresh
            </Button>
        </Container>
    );
};

BackButton.propTypes = {
    history: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getPurchases: PropTypes.func.isRequired,
    getAcceptedComps: PropTypes.func.isRequired,
    getInPendingComp: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
    setPurchaseLoading: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
};

export default withRouter(
    connect(null, {
        getUser,
        getPurchases,
        getAcceptedComps,
        getInPendingComp,
        setUserLoading,
        setPurchaseLoading,
        setCompLoading,
    })(BackButton)
);
