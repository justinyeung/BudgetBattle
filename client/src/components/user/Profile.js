import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Profile = ({
    profile: { user, numFriends, numPurchases, numCompetitions },
}) => {
    return (
        <div>
            <Box boxShadow={1} className="container-spacing component-box">
                <Typography variant="h6" id="header-title">
                    Profile
                </Typography>
                <Divider />

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        <Typography variant="h6">Name:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        {user && user.name}
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        <Typography variant="h6">User ID:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        {user && user.userID}
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        <Typography variant="h6">
                            Total # of friends:
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        {numFriends}
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        <Typography variant="h6">
                            Total # of purchases:
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        {numPurchases}
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        <Typography variant="h6">
                            Total # of battles:
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className="grid-spacing">
                        {numCompetitions}
                    </Grid>
                </Grid>
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
