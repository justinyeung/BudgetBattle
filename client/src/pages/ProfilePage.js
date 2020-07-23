import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Profile from '../components/user/Profile';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';

import {
    getNumCompsById,
    getProfileUserById,
    getNumPurchasesById,
    setProfileLoading,
} from '../actions/profileActions';

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
