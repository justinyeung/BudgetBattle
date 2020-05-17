import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';

const FriendsList = ({ getUser, user: { user } }) => {

    useEffect(() => {
        // get state of currently logged in user
        getUser();

        // eslint-disable-next-line
    }, []);

    return (
        <ul>
            {user !== null && 
            (<div>
                <li>Friends:</li>
                <li>
                    <ul>
                        {user.friends.map(friend => (
                            friend.status === "Accepted" && 
                            (
                            (friend.user2 === user.userID && 
                                (
                                    <div key={friend._id}>
                                        <li>Friend's ID: {friend.user1}</li>
                                        <li>Friend's Name: {friend.user1name}</li>
                                    </div>
                                )) || 
                            (friend.user1 === user.userID && 
                                (
                                    <div key={friend._id}>
                                        <li>Friend's ID: {friend.user2}</li>
                                        <li>Friend's Name: {friend.user2name}</li>
                                    </div>
                                ))
                            )
                        ))}
                    </ul>
                </li>
            </div>)
            }
        </ul>
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