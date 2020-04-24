import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, logout } from '../../actions/userActions';

const FBLoginBtn = ({ user, getUser, logout }) => {
    const getUserButton = () => {
        getUser();
    }

    const logoutButton = () => {
        logout();
    }

    return(
        <div>
            <a href="http://localhost:5000/api/fbauth/login/">Login to Facebook</a>
            <br />
            <button onClick={getUserButton}>Get User Info To State</button>
            <br />
            <a href="http://localhost:5000/api/fbauth/logout/" onClick={logoutButton}>Logout of Facebook</a>
        </div>
    )
}

FBLoginBtn.propTypes = {
    getUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { getUser, logout })(FBLoginBtn);