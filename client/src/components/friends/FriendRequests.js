import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUser } from '../../actions/userActions';
import {
    acceptFriend,
    deleteFriend,
    setUserLoading,
} from '../../actions/userActions';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const moment = require('moment');

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
}));

const FriendRequests = ({
    getUser,
    acceptFriend,
    deleteFriend,
    setUserLoading,
    user: { user },
}) => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const classes = useStyles();

    useEffect(() => {
        getUser();

        // eslint-disable-next-line
    }, []);

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
            <Box boxShadow={1} className="container-spacing component-box">
                <Typography variant="h6" id="header-title">
                    Friend Requests
                </Typography>
                <Divider />
                <List className={classes.root}>
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
                                            className={classes.inline}
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
                    {user !== null && (
                        <div>
                            {getRequests(user.friends).map((friend) => (
                                <div>
                                    <ListItem
                                        alignItems="flex-start"
                                        key={friend._id}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                {friend.user1name &&
                                                    friend.user1name.substring(
                                                        0,
                                                        1
                                                    )}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={friend.user1name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={
                                                            classes.inline
                                                        }
                                                        color="textPrimary"
                                                    >
                                                        Since{' '}
                                                        {moment(
                                                            new Date(
                                                                friend.date
                                                            )
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
                                </div>
                            ))}
                        </div>
                    )}
                </List>
            </Box>
            {renderSnackbar}
        </div>
    );
};

FriendRequests.propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    acceptFriend: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {
    getUser,
    acceptFriend,
    deleteFriend,
    setUserLoading,
})(FriendRequests);
