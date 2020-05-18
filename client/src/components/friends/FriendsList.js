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

const FriendsList = ({ getUser, user: { user } }) => {
    const classes = useStyles();

    useEffect(() => {
        // get state of currently logged in user
        getUser();

        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth='xs'>
            <Typography variant='h4'>Friends</Typography>
            <Divider/>
            <List className={classes.root}>
                {user === null && (
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
                            {user.friends.map(friend => (
                                friend.status === "Accepted" && 
                                (
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
                                        </ListItem>
                                    </div>
                                ))
                            )
                            ))}
                    </div>)
                }
            </List>
        </Container>
    )
}

FriendsList.propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUser })(FriendsList);