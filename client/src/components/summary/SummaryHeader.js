import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

const SummaryHeader = ({ user: { user }, competition: { competition } }) => {
    return (
        <Box boxShadow={1} className="summary">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} md={5}>
                    <Typography variant="h4" className="summary-header-left">
                        <Avatar>
                            {user &&
                            competition &&
                            user.userID === competition.user1
                                ? competition &&
                                  competition.user1name &&
                                  competition.user1name.substring(0, 1)
                                : competition &&
                                  competition.user2name &&
                                  competition.user2name.substring(0, 1)}
                        </Avatar>
                        <div className="summary-header-title-text">
                            {user &&
                            competition &&
                            user.userID === competition.user1
                                ? competition && competition.user1name
                                : competition && competition.user2name}
                        </div>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography variant="h4" className="summary-header-title">
                        v.s.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography variant="h4" className="summary-header-right">
                        <div className="summary-header-title-text">
                            {user &&
                            competition &&
                            user.userID === competition.user1
                                ? competition && competition.user2name
                                : competition && competition.user1name}
                        </div>
                        <Avatar>
                            {user &&
                            competition &&
                            user.userID === competition.user1
                                ? competition &&
                                  competition.user2name &&
                                  competition.user2name.substring(0, 1)
                                : competition &&
                                  competition.user1name &&
                                  competition.user1name.substring(0, 1)}
                        </Avatar>
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item xs={5} className="summary-header-left-score">
                    <Typography variant="h4">
                        {user &&
                            competition &&
                            user.userID === competition.user1 &&
                            competition.user1total < competition.user2total && (
                                <div>
                                    {'-$'}
                                    {(
                                        competition.user2total -
                                        competition.user1total
                                    ).toFixed(2)}
                                </div>
                            )}
                        {user &&
                            competition &&
                            user.userID !== competition.user1 &&
                            competition.user2total < competition.user1total && (
                                <div>
                                    {'-$'}
                                    {(
                                        competition.user1total -
                                        competition.user2total
                                    ).toFixed(2)}
                                </div>
                            )}
                    </Typography>
                </Grid>
                <Grid item xs={2} className="summary-header-icon">
                    {user &&
                        competition &&
                        user.userID === competition.user1 &&
                        competition.user1total < competition.user2total && (
                            <ArrowBackIcon fontSize="large" />
                        )}
                    {user &&
                        competition &&
                        user.userID === competition.user1 &&
                        competition.user1total > competition.user2total && (
                            <ArrowForwardIcon fontSize="large" />
                        )}
                    {user &&
                        competition &&
                        user.userID !== competition.user1 &&
                        competition.user2total < competition.user1total && (
                            <ArrowBackIcon fontSize="large" />
                        )}
                    {user &&
                        competition &&
                        user.userID !== competition.user1 &&
                        competition.user2total > competition.user1total && (
                            <ArrowForwardIcon fontSize="large" />
                        )}
                    {competition &&
                        competition.user1total === competition.user2total && (
                            <SyncAltIcon fontSize="large" />
                        )}
                </Grid>
                <Grid item xs={5} className="summary-header-right-score">
                    <Typography variant="h4">
                        {user &&
                            competition &&
                            user.userID === competition.user1 &&
                            competition.user2total < competition.user1total && (
                                <div>
                                    {'-$'}
                                    {(
                                        competition.user1total -
                                        competition.user2total
                                    ).toFixed(2)}
                                </div>
                            )}
                        {user &&
                            competition &&
                            user.userID !== competition.user1 &&
                            competition.user1total < competition.user2total && (
                                <div>
                                    {'-$'}
                                    {(
                                        competition.user2total -
                                        competition.user1total
                                    ).toFixed(2)}
                                </div>
                            )}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

SummaryHeader.propTypes = {
    user: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps)(SummaryHeader);
