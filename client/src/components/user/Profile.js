import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Profile = ({
    profile: {
        user,
        numFriends,
        numPurchases,
        numCompetitions,
        profileLoading,
    },
}) => {
    return (
        <div>
            <Box boxShadow={1} className="container-spacing component-box">
                <Typography variant="h6" id="header-title">
                    Profile
                </Typography>
                <Divider />

                {!profileLoading && (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className="container-spacing"
                    >
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            Name:
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            {user && user.name}
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            User ID:
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            {user && user.userID}
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            Total # of friends:
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            {numFriends}
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            Total # of purchases:
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            {numPurchases}
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            Total # of battles:
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            {numCompetitions}
                        </Grid>
                    </Grid>
                )}
            </Box>
        </div>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps)(Profile);
