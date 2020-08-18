import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Profile from '../components/layout/Profile';

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
    profile,
    history,
}) => {
    let { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        setProfileLoading();
        getProfileUserById({ id });
        getNumPurchasesById({ id });
        getNumCompsById({ id });

        // eslint-disable-next-line
    }, []);

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
                        <Profile profile={profile} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

ProfilePage.propTypes = {
    history: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getNumCompsById: PropTypes.func.isRequired,
    getProfileUserById: PropTypes.func.isRequired,
    getNumPurchasesById: PropTypes.func.isRequired,
    setProfileLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default withRouter(
    connect(mapStateToProps, {
        getNumCompsById,
        getProfileUserById,
        getNumPurchasesById,
        setProfileLoading,
    })(ProfilePage)
);
