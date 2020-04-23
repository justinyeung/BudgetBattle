import React, { Profiler } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';

const FBLoginBtn = ({ getUser }) => {
    const onSubmit = () => {
        getUser();
    }

    return(
        <div>
            {/* <a href="http://localhost:5000/api/auth/login/facebook/">Login to Facebook</a> */}
            <a href="#" onClick={onSubmit}>Login to Facebook</a>
        </div>
    )
}

FBLoginBtn.propTypes = {
    getUser: PropTypes.func.isRequired
}

export default FBLoginBtn;