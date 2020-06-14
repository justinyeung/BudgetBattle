import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    getUser,
    deleteFriend,
    acceptFriend,
    sendFriendRequest,
    setUserLoading,
} from '../../actions/userActions';
import { searchUsers, setSearchLoading } from '../../actions/searchActions';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        background: '#f5f5f5',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    list: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        margin: 0,
    },
    avatar: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

const FriendForm = ({
    sendFriendRequest,
    searchUsers,
    getUser,
    deleteFriend,
    acceptFriend,
    setUserLoading,
    setSearchLoading,
    user: { user },
    search: { users },
}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [friendSearch, setFriendSearch] = useState('');

    useEffect(() => {
        getUser();

        // eslint-disable-next-line
    }, []);

    // snackbar methods
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
    const searchBtn = () => {
        setSearchLoading();
        searchUsers({ friendSearch });
        setFriendSearch('');
    };
    const addFriendBtn = (friendID) => {
        setUserLoading();
        sendFriendRequest({ friendID });
        setSnackbarMsg('Request Sent');
        handleClick();
    };
    const removeFriendBtn = (friendID) => {
        setUserLoading();
        deleteFriend({ friendID });
        setSnackbarMsg('Friend Removed');
        handleClick();
    };
    const removeRequestBtn = (friendID) => {
        setUserLoading();
        deleteFriend({ friendID });
        setSnackbarMsg('Request Removed');
        handleClick();
    };
    const acceptRequestBtn = (friendID) => {
        setUserLoading();
        acceptFriend({ friendID });
        setSnackbarMsg('Request Accepted');
        handleClick();
    };

    // Search result buttons
    const detectRelationship = (userID) => {
        if (userID === user.userID) {
            return <Button>You</Button>;
        } else if (isOutpending(userID)) {
            return (
                <Button onClick={() => removeRequestBtn(userID)}>
                    Requested
                </Button>
            );
        } else if (isInpending(userID)) {
            return (
                <Button onClick={() => acceptRequestBtn(userID)}>
                    Accept Request
                </Button>
            );
        } else if (isFriend(userID)) {
            return (
                <Button onClick={() => removeFriendBtn(userID)}>Remove</Button>
            );
        } else {
            return (
                <Button onClick={() => addFriendBtn(userID)}>Add Friend</Button>
            );
        }
    };

    // local methods for search result buttons
    const isFriend = (userID) => {
        let myFriends = user.friends.filter(
            (friend) => friend.status === 'Accepted'
        );
        for (let i = 0; i < myFriends.length; i++) {
            if (
                myFriends[i].user1 === userID ||
                myFriends[i].user2 === userID
            ) {
                return true;
            }
        }
        return false;
    };
    const isOutpending = (userID) => {
        let myFriends = user.friends.filter(
            (friend) => friend.status === 'Pending'
        );
        for (let i = 0; i < myFriends.length; i++) {
            if (myFriends[i].user2 === userID) {
                return true;
            }
        }
        return false;
    };
    const isInpending = (userID) => {
        let myFriends = user.friends.filter(
            (friend) => friend.status === 'Pending'
        );
        for (let i = 0; i < myFriends.length; i++) {
            if (myFriends[i].user1 === userID) {
                return true;
            }
        }
        return false;
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
            message={snackbarMsg}
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
                    Add Friend
                </Typography>
                <Divider />
                <div id="purchases-form-grid">
                    <Paper component="div" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            value={friendSearch}
                            onChange={(e) => setFriendSearch(e.target.value)}
                            onKeyPress={(e) => {
                                e.key === 'Enter' && searchBtn();
                            }}
                            placeholder="Search Users by Name or ID"
                            inputProps={{ 'aria-label': 'search users' }}
                        />
                        <IconButton
                            type="button"
                            onClick={() => searchBtn()}
                            className={classes.iconButton}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    className="search-request-container"
                >
                    {user &&
                        users.map(
                            (searchUser) =>
                                user.userID !== searchUser.userID && (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        key={searchUser._id}
                                        className={
                                            ('search-item', 'grid-spacing')
                                        }
                                    >
                                        <ListItem ContainerComponent="div">
                                            <ListItemAvatar
                                                className={classes.avatar}
                                            >
                                                <Avatar>
                                                    {searchUser.name &&
                                                        searchUser.name.substring(
                                                            0,
                                                            1
                                                        )}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={searchUser.name}
                                                secondary={
                                                    searchUser.friends
                                                        .length === 1
                                                        ? searchUser.friends
                                                              .length +
                                                          ' Friend'
                                                        : searchUser.friends
                                                              .length +
                                                          ' Friends'
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                {detectRelationship(
                                                    searchUser.userID
                                                )}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Grid>
                                )
                        )}
                </Grid>
            </Box>
            {renderSnackbar}
        </div>
    );
};

FriendForm.propTypes = {
    search: PropTypes.object.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    acceptFriend: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
    setSearchLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    search: state.search,
});

export default connect(mapStateToProps, {
    sendFriendRequest,
    searchUsers,
    getUser,
    deleteFriend,
    acceptFriend,
    setUserLoading,
    setSearchLoading,
})(FriendForm);
