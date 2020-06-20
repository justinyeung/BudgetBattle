import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CurrentUser = ({ user: { user } }) => {
    return (
        <ul>
            {user !== null && (
                <div>
                    <li>Name: {user !== null && user.name}</li>
                    <li>User ID: {user !== null && user.userID}</li>
                    <li>Friends:</li>
                    <li>
                        <ul>
                            {user.friends.map(
                                (friend) =>
                                    friend.status === 'Accepted' &&
                                    ((friend.user2 === user.userID && (
                                        <div key={friend._id}>
                                            <li>Friend's ID: {friend.user1}</li>
                                            <li>
                                                Friend's Name:{' '}
                                                {friend.user1name}
                                            </li>
                                        </div>
                                    )) ||
                                        (friend.user1 === user.userID && (
                                            <div key={friend._id}>
                                                <li>
                                                    Friend's ID: {friend.user2}
                                                </li>
                                                <li>
                                                    Friend's Name:{' '}
                                                    {friend.user2name}
                                                </li>
                                            </div>
                                        )))
                            )}
                        </ul>
                    </li>
                    <li>Outpending Friend Requests:</li>
                    <li>
                        <ul>
                            {user.friends.map(
                                (friend) =>
                                    friend.status === 'Pending' &&
                                    friend.user1 === user.userID && (
                                        <div key={friend._id}>
                                            <li>Friend's ID: {friend.user2}</li>
                                            <li>
                                                Friend's Name:{' '}
                                                {friend.user2name}
                                            </li>
                                        </div>
                                    )
                            )}
                        </ul>
                    </li>
                    <li>Inpending Friend Requests:</li>
                    <li>
                        <ul>
                            {user.friends.map(
                                (friend) =>
                                    friend.status === 'Pending' &&
                                    friend.user2 === user.userID && (
                                        <div key={friend._id}>
                                            <li>Friend's ID: {friend.user1}</li>
                                            <li>
                                                Friend's Name:{' '}
                                                {friend.user1name}
                                            </li>
                                        </div>
                                    )
                            )}
                        </ul>
                    </li>
                </div>
            )}
        </ul>
    );
};

CurrentUser.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(CurrentUser);
