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
        <Box boxShadow={1} className="container-spacing component-box">
            <Typography variant="h4" className="summary-header-title">
                <Avatar>
                    {user && competition && user.userID === competition.user1
                        ? competition &&
                          competition.user1name &&
                          competition.user1name.substring(0, 1)
                        : competition &&
                          competition.user2name &&
                          competition.user2name.substring(0, 1)}
                </Avatar>
                <div className="summary-header-title-text">
                    {user && competition && user.userID === competition.user1
                        ? competition && (
                              <div>
                                  {competition.user1name +
                                      ' v.s. ' +
                                      competition.user2name}
                              </div>
                          )
                        : competition && (
                              <div>
                                  {competition.user2name +
                                      ' v.s. ' +
                                      competition.user1name}
                              </div>
                          )}
                </div>
                <Avatar>
                    {user && competition && user.userID === competition.user1
                        ? competition &&
                          competition.user2name &&
                          competition.user2name.substring(0, 1)
                        : competition &&
                          competition.user1name &&
                          competition.user1name.substring(0, 1)}
                </Avatar>
            </Typography>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item xs={4} className="grid-spacing">
                    <Typography variant="h4">
                        {user &&
                            competition &&
                            user.userID === competition.user1 &&
                            competition.user1total < competition.user2total && (
                                <div>
                                    {'-'}
                                    {competition.user2total -
                                        competition.user1total}
                                </div>
                            )}
                        {user &&
                            competition &&
                            user.userID === competition.user1 &&
                            competition.user2total < competition.user1total &&
                            competition.user2name}
                        {user &&
                            competition &&
                            user.userID !== competition.user1 &&
                            competition.user2total < competition.user1total && (
                                <div>
                                    {'-'}
                                    {competition &&
                                        competition.user1total -
                                            competition.user2total}
                                </div>
                            )}
                        {user &&
                            competition &&
                            user.userID !== competition.user1 &&
                            competition.user1total < competition.user2total &&
                            competition.user1name}
                    </Typography>
                </Grid>
                <Grid item xs={4} className="grid-spacing">
                    {user &&
                        competition &&
                        user.userID === competition.user1 &&
                        competition.user1total < competition.user2total && (
                            <ArrowBackIcon />
                        )}
                    {user &&
                        competition &&
                        user.userID === competition.user1 &&
                        competition.user1total > competition.user2total && (
                            <ArrowForwardIcon />
                        )}
                    {user &&
                        competition &&
                        user.userID !== competition.user1 &&
                        competition.user2total < competition.user1total && (
                            <ArrowBackIcon />
                        )}
                    {user &&
                        competition &&
                        user.userID !== competition.user1 &&
                        competition.user2total > competition.user1total && (
                            <ArrowForwardIcon />
                        )}
                    {competition &&
                        competition.user1total === competition.user2total && (
                            <SyncAltIcon />
                        )}
                </Grid>
                <Grid item xs={4} className="grid-spacing">
                    <Typography variant="h4">
                        {user &&
                            competition &&
                            user.userID === competition.user1 &&
                            competition.user1total < competition.user2total &&
                            competition.user1name}
                        {user &&
                            competition &&
                            user.userID === competition.user1 &&
                            competition.user2total < competition.user1total && (
                                <div>
                                    {'-'}
                                    {competition &&
                                        competition.user1total -
                                            competition.user2total}
                                </div>
                            )}
                        {user &&
                            competition &&
                            user.userID !== competition.user1 &&
                            competition.user2total < competition.user1total &&
                            competition.user2name}
                        {user &&
                            competition &&
                            user.userID !== competition.user1 &&
                            competition.user1total < competition.user2total && (
                                <div>
                                    {'-'}
                                    {competition &&
                                        competition.user1total -
                                            competition.user2total}
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
