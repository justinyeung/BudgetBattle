import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserType } from '../../models/enums';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const SummaryTitle = ({
    userType,
    user: { user },
    competition: { competition, user1Purchases, user2Purchases },
}) => {
    return (
        <Box boxShadow={1} className="container-spacing component-box">
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
                    <Grid item xs={12} className="grid-spacing">
                        <Typography variant="h6" className="summary-title-item">
                            {'Total Amount Spent: $'}
                            {userType === UserType.USER &&
                                user &&
                                competition &&
                                user.userID === competition.user1 &&
                                competition &&
                                competition.user1total}
                            {userType === UserType.USER &&
                                user &&
                                competition &&
                                user.userID !== competition.user1 &&
                                competition &&
                                competition.user2total}
                            {userType === UserType.COMPETITOR &&
                                user &&
                                competition &&
                                user.userID === competition.user1 &&
                                competition &&
                                competition.user2total}
                            {userType === UserType.COMPETITOR &&
                                user &&
                                competition &&
                                user.userID !== competition.user1 &&
                                competition &&
                                competition.user1total}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className="grid-spacing">
                        <Typography variant="h6" className="summary-title-item">
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