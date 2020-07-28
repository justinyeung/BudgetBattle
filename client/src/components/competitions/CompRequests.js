import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { monthNames } from '../../models/lists';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';

import {
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    ListItemSecondaryAction,
    Box,
    Snackbar,
} from '@material-ui/core';

/**
 * Component to show all incoming Battle Requests
 * 
 * @param {function} acceptComp - Method to accept competitions 
 */
const CompRequests = ({
    acceptComp,
    rejectOrDeleteComp,
    setCompLoading,
    competition: { inpending },
}) => {
    const [snacbarMsg, setSnackbarMsg] = useState('');
    const [open, setOpen] = useState(false);

    // snackbar
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // buttons
    const acceptBtn = (compID) => {
        setCompLoading();
        acceptComp({ compID });
        setSnackbarMsg('Competition Request Accepted');
        handleClick();
    };
    const rejectBtn = (compID) => {
        setCompLoading();
        rejectOrDeleteComp({ compID });
        setSnackbarMsg('Rejected Competition Request');
        handleClick();
    };

    const renderSnackbar = (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={snacbarMsg}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );

    return (
        <div>
            <Box boxShadow={1} className="competitions">
                <Typography variant="h6" className="competitions-title">
                    Battle Requests
                </Typography>
                <Divider />
                <List className="competitions-full-width">
                    {(inpending.length === 0 || inpending === null) && (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>{':('}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={'No Competitions to show.'}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className="competitions-description"
                                            color="textPrimary"
                                        >
                                            Invite Friends to start Budget
                                            Battling!
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    )}
                    {inpending !== [] &&
                        inpending.map((comp) => (
                            <ListItem alignItems="flex-start" key={comp._id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        {comp.user1name &&
                                            comp.user1name.substring(0, 1)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={comp.user1name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className="competitions-description"
                                                color="textPrimary"
                                            >
                                                {monthNames[comp.month]}{' '}
                                                {comp.year}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => acceptBtn(comp._id)}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => rejectBtn(comp._id)}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                </List>
            </Box>
            {renderSnackbar}
        </div>
    );
};

CompRequests.propTypes = {
    competition: PropTypes.object.isRequired,
    acceptComp: PropTypes.func.isRequired,
    rejectOrDeleteComp: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
};

export default CompRequests;
