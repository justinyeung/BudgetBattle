import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserType } from '../../models/enums';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const SummaryTitle = ({
    userType,
    user: { user },
    competition: { competition, user1purchases, user2purchases },
}) => {
    return (
        <Box boxShadow={1} className="container-spacing component-box">
            <Typography variant="h4" className="summary-title">
                <Avatar>
                    {user && competition && userType === UserType.USER
                        ? competition &&
                          competition.user1name &&
                          competition.user1name.substring(0, 1)
                        : competition &&
                          competition.user2name &&
                          competition.user2name.substring(0, 1)}
                </Avatar>
                <div class="summary-title-text">
                    {user && competition && userType === UserType.USER
                        ? competition && competition.user1name
                        : competition && competition.user2name}
                </div>
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="center">
                <Grid
                    container
                    direction="row"
                    justify="start"
                    alignItems="center"
                >
                    <Grid item xs={12} className="grid-spacing">
                        <Typography variant="h5">
                            {'Total Sum: $'}
                            {user && competition && userType === UserType.USER
                                ? competition && competition.user1total
                                : competition && competition.user2total}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

SummaryTitle.propTypes = {
    user: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps)(SummaryTitle);
