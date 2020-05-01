import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/userActions';
import { clearPurchases } from '../../actions/purchaseActions';
import { clearComps } from '../../actions/competitionActions';

const LogoutBtn = ({ logout, clearPurchases, clearComps }) => {

    const logoutButton = () => {
        clearPurchases();
        clearComps();
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
    clearPurchases: PropTypes.func.isRequired,
    clearComps: PropTypes.func.isRequired
}

export default connect(null, { logout, clearPurchases, clearComps })(LogoutBtn);