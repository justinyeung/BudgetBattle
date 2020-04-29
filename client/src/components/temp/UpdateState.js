// TEMPORARY BUTTON

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';
import { getPurchases } from '../../actions/purchaseActions';

const GetUserBtn = ({ getUser, getPurchases }) => {
    const getUserButton = () => {
        getUser();
    }

    const getPurchaseBtn = () => {
        getPurchases();
    }

    return(
        <div>
            <button onClick={getUserButton}>Get User Info To State</button>
            <br/>
            <button onClick={getPurchaseBtn}>Get User's Purchases</button>
        </div>
    )
}

GetUserBtn.propTypes = {
    getUser: PropTypes.func.isRequired,
    getPurchases: PropTypes.func.isRequired
}

export default connect(null, { getUser, getPurchases })(GetUserBtn);