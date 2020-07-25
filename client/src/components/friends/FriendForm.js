import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    deleteFriend,
    acceptFriend,
    sendFriendRequest,
    setUserLoading,
} from '../../actions/userActions';
import { searchUsers, setSearchLoading } from '../../actions/searchActions';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import {
    Box,
    Paper,
    InputBase,
    IconButton,
    Typography,
    Divider,
    ListItem,
    Grid,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListItemSecondaryAction,
    Button,
    Snackbar,
} from '@material-ui/core';

const FriendForm = ({
    sendFriendRequest,
    searchUsers,
    deleteFriend,
    acceptFriend,
    setUserLoading,
    setSearchLoading,
    user: { user },
    search: { users },
}) => {
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [friendSearch, setFriendSearch] = useState('');

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
        if (friendSearch) {
            setSearchLoading();
            searchUsers({ friendSearch });
        }
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
        return (
            <div>
                {userID === user.userID && <Button>You</Button>}
                {isOutpending(userID) && (
                    <Button
                        variant="outlined"
                        onClick={() => removeRequestBtn(userID)}
                    >
                        Requested
                    </Button>
                )}
                {isInpending(userID) && (
                    <Button
                        variant="outlined"
                        onClick={() => acceptRequestBtn(userID)}
                    >
                        Accept Request
                    </Button>
                )}
                {isFriend(userID) && (
                    <Button
                        variant="outlined"
                        onClick={() => removeFriendBtn(userID)}
                    >
                        Remove
                    </Button>
                )}
                {!isOutpending(userID) &&
                    !isInpending(userID) &&
                    !isFriend(userID) && (
                        <Button
                            variant="outlined"
                            onClick={() => addFriendBtn(userID)}
                        >
                            Add Friend
                        </Button>
                    )}
            </div>
        );
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
            <Box boxShadow={1} className="friends">
                <Typography variant="h6">Add Friend</Typography>
                <Divider />
                <Paper component="div" className="friends-search-bar">
                    <InputBase
                        className="friends-search-input"
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
                        className="friends-icon-button"
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    className="friends-search-results"
                >
                    {user &&
                        users.map(
                            (searchUser) =>
                                user.userID !== searchUser.userID && (
                                    <Grid
                                        item
                                        xs={12}
                                        lg={4}
                                        key={searchUser._id}
                                        className="friends-search-item"
                                    >
                                        <ListItem ContainerComponent="div">
                                            <Link
                                                to={`/profile/${searchUser.userID}`}
                                            >
                                                <Button className="friends-profile-btn">
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            {searchUser.name &&
                                                                searchUser.name.substring(
                                                                    0,
                                                                    1
                                                                )}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            searchUser.name
                                                        }
                                                        secondary={
                                                            searchUser.friends
                                                                .length === 1
                                                                ? searchUser
                                                                      .friends
                                                                      .length +
                                                                  ' Friend'
                                                                : searchUser
                                                                      .friends
                                                                      .length +
                                                                  ' Friends'
                                                        }
                                                    />
                                                </Button>
                                            </Link>
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
    user: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
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
    deleteFriend,
    acceptFriend,
    setUserLoading,
    setSearchLoading,
})(FriendForm);
