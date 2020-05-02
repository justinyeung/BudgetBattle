import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, login } from '../../actions/userActions';

const CurrentUser = ({ getUser, login, user: { user } }) => {

    useEffect(() => {
        // get state of currently logged in user
        getUser();
        // if(user !== null){
        //     // set isLoggedIn to true
        //     login();
        // }
        // eslint-disable-next-line
    }, []);

    return (
        <ul>
            {user !== null && 
            (<div>
                <li>Name: {user !== null && user.name}</li>
                <li>User ID: {user !== null && user.userID}</li>
                <li>Friends:</li>
                <li>
                    <ul>
                        {user.friends.map(friend => (
                            friend.status === "Accepted" && 
                            (
                            (friend.user2 === user.userID && 
                                (
                                    <div>
                                        <li key={friend._id}>Friend's ID: {friend.user1}</li>
                                        <li key={friend._id}>Friend's Name: {friend.user1name}</li>
                                    </div>
                                )) || 
                            (friend.user1 === user.userID && 
                                (
                                    <div>
                                        <li key={friend._id}>Friend's ID: {friend.user2}</li>
                                        <li key={friend._id}>Friend's Name: {friend.user2name}</li>
                                    </div>
                                ))
                            )
                        ))}
                    </ul>
                </li>
                <li>Outpending Friend Requests:</li>
                <li>
                    <ul>
                        {user.friends.map(friend => (
                            friend.status === "Pending" && 
                            friend.user1 === user.userID &&
                            (
                                <div>
                                    <li key={friend._id}>Friend's ID: {friend.user2}</li>
                                    <li key={friend._id}>Friend's Name: {friend.user2name}</li>
                                </div>
                            )
                        ))}
                    </ul>
                </li>
                <li>Inpending Friend Requests:</li>
                <li>
                    <ul>
                        {user.friends.map(friend => (
                            friend.status === "Pending" && 
                            friend.user2 === user.userID &&
                            (<div>
                                <li key={friend._id}>Friend's ID: {friend.user1}</li>
                                <li key={friend._id}>Friend's Name: {friend.user1name}</li>
                            </div>
                            )
                        ))}
                    </ul>
                </li>
            </div>)
            }
        </ul>
    )
}

CurrentUser.propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUser, login })(CurrentUser);