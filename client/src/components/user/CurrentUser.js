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
                <ul>
                    <li>Friends:</li>
                    {user.friends !== null && user.friends.map(friend => (
                        friend != null && (<li key={friend._id}>{friend._id}</li>)
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