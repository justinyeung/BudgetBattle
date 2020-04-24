// TEMPORARY BUTTON

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';

const GetUserBtn = ({ getUser }) => {
    const getUserButton = () => {
        getUser();
    }

    return(
        <div>
            <button onClick={getUserButton}>Get User Info To State</button>
        </div>
    )
}

GetUserBtn.propTypes = {
    getUser: PropTypes.func.isRequired
}

export default connect(null, { getUser })(GetUserBtn);