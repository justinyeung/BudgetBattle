import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const SummaryPurchases = ({
    user: { user },
    competition: { competition, user1Purchases, user2Purchases },
}) => {
    return (
        <Box boxShadow={1} className="container-spacing component-box">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h5"
                        className="summary-title-title summary-purchases-title"
                    >
                        {user &&
                        competition &&
                        user.userID === competition.user1
                            ? competition && competition.user1name
                            : competition && competition.user2name}
                        {"'s Purchases"}
                    </Typography>
                    <Divider />
                    <Box display="flex" justifyContent="center">
                        {user &&
                        competition &&
                        user.userID === competition.user1
                            ? user1Purchases &&
                              user1Purchases.map((purchase) => (
                                  <p>{purchase._id}</p>
                              ))
                            : user2Purchases &&
                              user2Purchases.map((purchase) => (
                                  <p>{purchase._id}</p>
                              ))}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h5"
                        className="summary-title-title summary-purchases-title"
                    >
                        {user &&
                        competition &&
                        user.userID === competition.user1
                            ? competition && competition.user2name
                            : competition && competition.user1name}
                        {"'s Purchases"}
                    </Typography>
                    <Divider />
                    <Box display="flex" justifyContent="center">
                        {user &&
                        competition &&
                        user.userID === competition.user1
                            ? user2Purchases &&
                              user2Purchases.map((purchase) => (
                                  <p>{purchase._id}</p>
                              ))
                            : user1Purchases &&
                              user1Purchases.map((purchase) => (
                                  <p>{purchase._id}</p>
                              ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

SummaryPurchases.propTypes = {
    user: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps)(SummaryPurchases);
