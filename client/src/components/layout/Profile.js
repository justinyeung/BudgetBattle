import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Box, Typography, Divider } from '@material-ui/core';

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
            <Box boxShadow={1} className="profile">
                <Typography variant="h6">Profile</Typography>
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
                            <Typography variant="body1">Name:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">
                                {user && user.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">User ID:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">
                                {user && user.userID}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">
                                Total # of friends:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">
                                {numFriends}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">
                                Total # of purchases:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">
                                {numPurchases}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">
                                Total # of battles:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className="profile-spacing">
                            <Typography variant="body1">
                                {numCompetitions}
                            </Typography>
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

export default Profile;
