// TEMPORARY BUTTON

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUser, logout } from '../../actions/userActions';

const DeleteUserBtn = ({ logout, deleteUser }) => {
    const deleteUserButton = () => {
        deleteUser();
        // logout();
    }

    return(
        <div>
            <button onClick={deleteUserButton}>Delete Logged In User</button>
        </div>
    )
}

DeleteUserBtn.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

export default connect(null, { deleteUser, logout })(DeleteUserBtn);