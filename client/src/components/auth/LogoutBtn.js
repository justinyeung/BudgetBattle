import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/userActions';

const LogoutBtn = ({ logout }) => {

    const logoutButton = () => {
        logout();
    }

    return(
        <div>
            {/* <a href="http://localhost:5000/api/users/logout/" onClick={logoutButton}>Logout</a> */}
            <button onClick={logoutButton}>Logout</button>
        </div>
    )
}

LogoutBtn.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(LogoutBtn);