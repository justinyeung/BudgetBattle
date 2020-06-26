import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Profile from '../components/user/Profile';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
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
            <Container maxWidth="lg" className="container-spacing">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item xs={12} className="grid-spacing">
                        <Profile />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

ProfilePage.propTypes = {
    getNumCompsById: PropTypes.func.isRequired,
    getProfileUserById: PropTypes.func.isRequired,
    getNumPurchasesById: PropTypes.func.isRequired,
    setProfileLoading: PropTypes.func.isRequired,
};

export default connect(null, {
    getNumCompsById,
    getProfileUserById,
    getNumPurchasesById,
    setProfileLoading,
})(ProfilePage);
