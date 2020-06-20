import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const UserSummary = ({ user: { user }, competition: { competition } }) => {
    return (
        <Box boxShadow={1} className="container-spacing component-box">
            {user && competition && user.userID === competition.user1 ? (
                <Typography variant="h6" id="header-title">
                    {competition && competition.user1name}
                </Typography>
            ) : (
                <Typography variant="h6" id="header-title">
                    {competition && competition.user2name}
                </Typography>
            )}
            <Divider />
            {user && competition && user.userID === competition.user1 ? (
                <div>
                    <p>{competition && competition.user1}</p>
                </div>
            ) : (
                <div>
                    <p>{competition && competition.user2}</p>
                </div>
            )}
        </Box>
    );
};

UserSummary.propTypes = {
    user: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps, {})(UserSummary);
