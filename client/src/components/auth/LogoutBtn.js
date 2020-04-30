import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/userActions';
import { clearPurchases } from '../../actions/purchaseActions';

const LogoutBtn = ({ logout, clearPurchases }) => {

    const logoutButton = () => {
        clearPurchases();
        logout();
    }

    return(
        <div>
            <button onClick={logoutButton}>Logout</button>
        </div>
    )
}

LogoutBtn.propTypes = {
    logout: PropTypes.func.isRequired,
    clearPurchases: PropTypes.func.isRequired
}

export default connect(null, { logout, clearPurchases })(LogoutBtn);