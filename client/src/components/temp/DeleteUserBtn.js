// TEMPORARY

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUser } from '../../actions/userActions';
import { clearPurchases } from '../../actions/purchaseActions';
import { clearComps } from '../../actions/competitionActions';

const DeleteUserBtn = ({ deleteUser, clearPurchases, clearComps }) => {
    const deleteUserButton = () => {
        deleteUser();
        clearPurchases();
        clearComps();
    }

    return(
        <div>
            <button onClick={deleteUserButton}>Delete Logged In User</button>
        </div>
    )
}

DeleteUserBtn.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    clearPurchases: PropTypes.func.isRequired,
    clearComps: PropTypes.func.isRequired
}

export default connect(null, { deleteUser, clearPurchases, clearComps })(DeleteUserBtn);