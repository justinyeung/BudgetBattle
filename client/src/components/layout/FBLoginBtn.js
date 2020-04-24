import React from 'react';
import { connect } from 'react-redux';
import { getUser, logout } from '../../actions/userActions';

const FBLoginBtn = () => {

    return(
        <div>
            <a href="http://localhost:5000/api/fbauth/login/">Login to Facebook</a>
        </div>
    )
}

export default connect(null, { getUser, logout })(FBLoginBtn);