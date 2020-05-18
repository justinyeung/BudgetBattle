import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';

import Container from '@material-ui/core/Container';
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

const moment = require('moment');

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));



const FriendRequests = ({ getUser, user: { user } }) => {
    const classes = useStyles();
    
    const getRequests = (friendslist) => {
        return friendslist.filter(friend => friend.status === "Pending" && friend.user2 === user.userID)
    }
    
    useEffect(() => {
        // get state of currently logged in user
        getUser();

        // eslint-disable-next-line
    }, []);
    
    return (
        <Container maxWidth='xs'>
        <Typography variant='h4'>Friend Requests</Typography>
        <Divider/>
        <List className={classes.root}>
        {(user === null || getRequests(user.friends).length === 0 || getRequests(user.friends) === undefined) && (
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar>{":("}</Avatar>
            </ListItemAvatar>
            <ListItemText
            primary={"No Friend Requests to show."}
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
                    {getRequests(user.friends).map(friend => (
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
                            <IconButton edge="end" aria-label="delete">
                            <CheckIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                            <ClearIcon />
                            </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>
                        </div>
                    ))}
                            
                            </div>)
                        }
                        
                        </List>
                        </Container>
                        
                        )
                    }
                    
                    FriendRequests.propTypes = {
                        user: PropTypes.object.isRequired,
                        getUser: PropTypes.func.isRequired
                    }
                    
                    const mapStateToProps = state => ({
                        user: state.user
                    });
                    
                    export default connect(mapStateToProps, { getUser })(FriendRequests);