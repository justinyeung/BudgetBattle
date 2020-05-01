// TEMPORARY

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUser } from '../../actions/userActions';

const DeleteUserBtn = ({ deleteUser }) => {
    const deleteUserButton = () => {
        deleteUser();
    }

    return(
        <div>
            <button onClick={deleteUserButton}>Delete Logged In User</button>
        </div>
    )
}

DeleteUserBtn.propTypes = {
    deleteUser: PropTypes.func.isRequired
}

export default connect(null, { deleteUser })(DeleteUserBtn);