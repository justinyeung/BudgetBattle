import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserType } from '../../models/enums';
import SummaryPurchases from './SummaryPurchases';

import { Typography, Divider, Box, Grid } from '@material-ui/core';

const SummaryTitle = ({
    userType,
    user: { user },
    competition: { competition, user1Purchases, user2Purchases },
}) => {
    return (
        <Box boxShadow={1} className="summary">
            <Typography variant="h5" className="summary-title-title">
                {userType === UserType.USER &&
                    user &&
                    competition &&
                    user.userID === competition.user1 &&
                    competition &&
                    competition.user1name}
                {userType === UserType.USER &&
                    user &&
                    competition &&
                    user.userID !== competition.user1 &&
                    competition &&
                    competition.user2name}
                {userType === UserType.COMPETITOR &&
                    user &&
                    competition &&
                    user.userID === competition.user1 &&
                    competition &&
                    competition.user2name}
                {userType === UserType.COMPETITOR &&
                    user &&
                    competition &&
                    user.userID !== competition.user1 &&
                    competition &&
                    competition.user1name}
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="center">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} className="summary-title-item">
                        <Typography variant="h6">
                            {'Total Amount Spent: $'}
                            {userType === UserType.USER &&
                                user &&
                                competition &&
                                user.userID === competition.user1 &&
                                competition &&
                                competition.user1total.toFixed(2)}
                            {userType === UserType.USER &&
                                user &&
                                competition &&
                                user.userID !== competition.user1 &&
                                competition &&
                                competition.user2total.toFixed(2)}
                            {userType === UserType.COMPETITOR &&
                                user &&
                                competition &&
                                user.userID === competition.user1 &&
                                competition &&
                                competition.user2total.toFixed(2)}
                            {userType === UserType.COMPETITOR &&
                                user &&
                                competition &&
                                user.userID !== competition.user1 &&
                                competition &&
                                competition.user1total.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className="summary-title-item">
                        <Typography variant="h6">
                            {'Total # of Purchases Made: '}
                            {userType === UserType.USER &&
                                user &&
                                competition &&
                                user.userID === competition.user1 &&
                                user1Purchases &&
                                user1Purchases.length}
                            {userType === UserType.USER &&
                                user &&
                                competition &&
                                user.userID !== competition.user1 &&
                                user2Purchases &&
                                user2Purchases.length}
                            {userType === UserType.COMPETITOR &&
                                user &&
                                competition &&
                                user.userID === competition.user1 &&
                                user2Purchases &&
                                user2Purchases.length}
                            {userType === UserType.COMPETITOR &&
                                user &&
                                competition &&
                                user.userID !== competition.user1 &&
                                user1Purchases &&
                                user1Purchases.length}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {userType === UserType.USER &&
                            user &&
                            competition &&
                            user.userID === competition.user1 &&
                            user1Purchases && (
                                <SummaryPurchases purchases={user1Purchases} />
                            )}
                        {userType === UserType.USER &&
                            user &&
                            competition &&
                            user.userID !== competition.user1 &&
                            user2Purchases && (
                                <SummaryPurchases purchases={user2Purchases} />
                            )}
                        {userType === UserType.COMPETITOR &&
                            user &&
                            competition &&
                            user.userID === competition.user1 &&
                            user2Purchases && (
                                <SummaryPurchases purchases={user2Purchases} />
                            )}
                        {userType === UserType.COMPETITOR &&
                            user &&
                            competition &&
                            user.userID !== competition.user1 &&
                            user1Purchases && (
                                <SummaryPurchases purchases={user1Purchases} />
                            )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

SummaryTitle.propTypes = {
    userType: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps)(SummaryTitle);
