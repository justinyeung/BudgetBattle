// TEMPORARY BUTTON

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';

const FBLoginBtn = ({ getUser }) => {
    const getUserButton = () => {
        getUser();
    }

    return(
        <div>
            <button onClick={getUserButton}>Get User Info To State</button>
        </div>
    )
}

FBLoginBtn.propTypes = {
    getUser: PropTypes.func.isRequired
}

export default connect(null, { getUser })(FBLoginBtn);