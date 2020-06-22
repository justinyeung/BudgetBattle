import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserType } from '../../models/enums';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const SummaryHeader = ({
    userType,
    competition: { competition, user1Purchases, user2Purchases },
}) => {
    return (
        <Box boxShadow={1} className="container-spacing component-box">
            <Typography variant="h4" className="summary-header-title">
                <Avatar>
                    {userType === UserType.USER
                        ? competition &&
                          competition.user1name &&
                          competition.user1name.substring(0, 1)
                        : competition &&
                          competition.user2name &&
                          competition.user2name.substring(0, 1)}
                </Avatar>
                <div class="summary-header-title-text">
                    {userType === UserType.USER
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
                    {userType === UserType.USER
                        ? competition &&
                          competition.user2name &&
                          competition.user2name.substring(0, 1)
                        : competition &&
                          competition.user1name &&
                          competition.user1name.substring(0, 1)}
                </Avatar>
            </Typography>
        </Box>
    );
};

SummaryHeader.propTypes = {
    userType: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    competition: state.competition,
});

export default connect(mapStateToProps)(SummaryHeader);
