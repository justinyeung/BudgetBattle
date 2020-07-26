import React, { useState } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { deleteFriend, setUserLoading } from '../../actions/userActions';

import DeleteIcon from '@material-ui/icons/Delete';
import Draggable from 'react-draggable';

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
    ListItemSecondaryAction,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    IconButton,
    Snackbar,
} from '@material-ui/core';

const moment = require('moment');

const PaperComponent = (props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
};

const FriendsList = ({ deleteFriend, setUserLoading, user: { user } }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentID, setCurrentID] = useState('');
    const [currentName, setCurrentName] = useState('');

    //   snackbar open and close
    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    //   dialog open and close
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    //   button that removes a friend
    const removeButton = (friendID, friendName) => {
        setCurrentID(friendID);
        setCurrentName(friendName);
        handleClickOpenDialog();
    };

    //   button to confirm delete in dialog
    const confirmDelete = () => {
        setUserLoading();
        deleteFriend({ friendID: currentID });
        handleCloseDialog();
        handleClickSnackbar();
    };

    //   Get all accepted friends
    const getAccepted = (friendslist) => {
        return friendslist.filter(
            (friend) =>
                friend.status === 'Accepted' &&
                (friend.user2 === user.userID || friend.user1 === user.userID)
        );
    };

    const renderSnackbar = (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={'Friend Removed'}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );

    const renderDialog = (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }}>Remove Friend</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to remove {currentName} as a friend?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={confirmDelete} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <div>
            <Box boxShadow={1} className="friends">
                <Typography variant="h6">Friends</Typography>
                <Divider />
                <List className="friends-list">
                    {(user === null ||
                        getAccepted(user.friends).length === 0 ||
                        getAccepted(user.friends) === undefined) && (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>{':('}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={'No Friends to show.'}
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
                    {user !== null && (
                        <div>
                            {getAccepted(user.friends).map(
                                (friend) =>
                                    (friend.user2 === user.userID && (
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
                                                                color="textPrimary"
                                                            >
                                                                Since{' '}
                                                                {moment(
                                                                    new Date(
                                                                        friend.date
                                                                    )
                                                                ).format(
                                                                    'MMM DD YYYY'
                                                                )}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() =>
                                                            removeButton(
                                                                friend.user1
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </div>
                                    )) ||
                                    (friend.user1 === user.userID && (
                                        <ListItem
                                            alignItems="flex-start"
                                            key={friend._id}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {friend.user2name &&
                                                        friend.user2name.substring(
                                                            0,
                                                            1
                                                        )}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={friend.user2name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            Since{' '}
                                                            {moment(
                                                                new Date(
                                                                    friend.date
                                                                )
                                                            ).format(
                                                                'MMM DD YYYY'
                                                            )}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() =>
                                                        removeButton(
                                                            friend.user2,
                                                            friend.user2name
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                            )}
                        </div>
                    )}
                </List>
            </Box>
            {renderDialog}
            {renderSnackbar}
        </div>
    );
};

FriendsList.propTypes = {
    user: PropTypes.object.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//     user: state.user,
// });

// export default connect(mapStateToProps, {
//     deleteFriend,
//     setUserLoading,
// })(FriendsList);

export default FriendsList;
