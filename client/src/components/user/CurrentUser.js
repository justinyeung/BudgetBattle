import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, login } from '../../actions/userActions';

const CurrentUser = ({ getUser, login, user: { user } }) => {

    useEffect(() => {
        // get state of currently logged in user
        getUser();
        if(user !== null){
            // set isLoggedIn to true
            login();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ul>
            {user !== null && 
            (<div>
                <li>{user !== null && user.name}</li>
                <li>{user !== null && user.userID}</li>
                <ul>
                    {user.friends.map(friend => (
                        <li key={friend.userID}>{friend}</li>
                    ))}
                </ul>
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