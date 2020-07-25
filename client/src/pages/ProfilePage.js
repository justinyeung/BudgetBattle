import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Profile from '../components/user/Profile';

import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';

import {
    getNumCompsById,
    getProfileUserById,
    getNumPurchasesById,
    setProfileLoading,
} from '../actions/profileActions';

import { Grid, Container, Button } from '@material-ui/core';

const ProfilePage = ({
    setProfileLoading,
    getNumCompsById,
    getNumPurchasesById,
    getProfileUserById,
    history,
}) => {
    useEffect(() => {
        setProfileLoading();
        getProfileUserById({ id });
        getNumPurchasesById({ id });
        getNumCompsById({ id });

        // eslint-disable-next-line
    }, []);

    let { id } = useParams();

    return (
        <div>
            <Container maxWidth="lg" className="nav-btns">
                <Button variant="contained" onClick={() => history.goBack()}>
                    <KeyboardBackspaceRoundedIcon fontSize="large" /> Go Back
                </Button>
            </Container>
            <Container maxWidth="lg" className="pages">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item xs={12} className="pages-sections">
                        <Profile />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

ProfilePage.propTypes = {
    history: PropTypes.object.isRequired,
    getNumCompsById: PropTypes.func.isRequired,
    getProfileUserById: PropTypes.func.isRequired,
    getNumPurchasesById: PropTypes.func.isRequired,
    setProfileLoading: PropTypes.func.isRequired,
};

export default withRouter(
    connect(null, {
        getNumCompsById,
        getProfileUserById,
        getNumPurchasesById,
        setProfileLoading,
    })(ProfilePage)
);
