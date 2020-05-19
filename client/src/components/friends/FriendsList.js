import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';
import { deleteFriend } from '../../actions/userActions';


import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const moment = require('moment');

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      margin: 0
    },
    inline: {
      display: 'inline',
    },
  }));

const FriendsList = ({ getUser, deleteFriend, user: { user } }) => {
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const getAccepted = (friendslist) => {
        return friendslist.filter(friend => friend.status === "Accepted" && (friend.user2 === user.userID || friend.user1 === user.userID))
    }

    const removeButton = (friendID) => {
        deleteFriend({ friendID });
        handleClick();
    }

    useEffect(() => {
        // get state of currently logged in user
        getUser();

        // eslint-disable-next-line
    }, []);

    return (
        <div>
        <Container id="friendslist-container" maxWidth='xs'>
            <Typography variant='h4'>Friends</Typography>
            <Divider/>
            <List className={classes.root}>
                {(user === null || getAccepted(user.friends).length === 0 || getAccepted(user.friends) === undefined) && (
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>{":("}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={"No Friends to show."}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Add Friends to start Budget Battling!
                            </Typography>
                            </React.Fragment>
                        }
                    />
                    </ListItem>
                )}
                {user !== null && 
                    (<div>
                            {getAccepted(user.friends).map(friend => (
                                (friend.user2 === user.userID && (
                                    <div>
                                        <ListItem alignItems="flex-start" key={friend._id}>
                                            <ListItemAvatar>
                                                <Avatar>{friend.user1name && friend.user1name.substring(0,1)}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={friend.user1name}
                                                secondary={
                                                    <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Since { moment(new Date(friend.date)).format("MMM DD YYYY") }
                                                    </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => removeButton(friend.user1)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </div>
                                    )) || (friend.user1 === user.userID && (
                                    <div>
                                        <ListItem alignItems="flex-start" key={friend._id}>
                                            <ListItemAvatar>
                                                <Avatar>{friend.user2name && friend.user2name.substring(0,1)}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={friend.user2name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Since { moment(new Date(friend.date)).format("MMM DD YYYY") }
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => removeButton(friend.user2)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </div>
                                ))
                            ))}
                    </div>)
                }
            </List>
        </Container>

        

        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={"Friend Removed"}
            action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
            }
        />
        </div>
    )
}

FriendsList.propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUser, deleteFriend })(FriendsList);