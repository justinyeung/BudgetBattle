import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';

import {
    Box,
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    IconButton,
    ListItemSecondaryAction,
    Snackbar,
} from '@material-ui/core';

const moment = require('moment');

const FriendRequests = ({
    acceptFriend,
    deleteFriend,
    setUserLoading,
    user: { user },
}) => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const acceptButton = (friendID) => {
        setUserLoading();
        acceptFriend({ friendID });
        setMsg('Friend Request Accepted');
        handleClick();
    };

    const rejectButton = (friendID) => {
        setUserLoading();
        deleteFriend({ friendID });
        setMsg('Friend Request Rejected');
        handleClick();
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const getRequests = (friendslist) => {
        return friendslist.filter(
            (friend) =>
                friend.status === 'Pending' && friend.user2 === user.userID
        );
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
            message={msg}
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
            <Box boxShadow={1} className="friends">
                <Typography variant="h6">Friend Requests</Typography>
                <Divider />
                <List className="friends-list">
                    {(user === null ||
                        getRequests(user.friends).length === 0 ||
                        getRequests(user.friends) === undefined) && (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>{':('}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={'No Friend Requests to show.'}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            Add Friends to start Budget
                                            Battling!
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    )}
                    {user !== null &&
                        getRequests(user.friends).map((friend) => (
                            <ListItem alignItems="flex-start" key={friend._id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        {friend.user1name &&
                                            friend.user1name.substring(0, 1)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={friend.user1name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Since{' '}
                                                {moment(
                                                    new Date(friend.date)
                                                ).format('MMM DD YYYY')}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                            acceptButton(friend.user1)
                                        }
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                            rejectButton(friend.user1)
                                        }
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

FriendRequests.propTypes = {
    user: PropTypes.object.isRequired,
    acceptFriend: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
};

export default FriendRequests;
