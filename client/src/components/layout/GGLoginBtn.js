import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';

const GGLoginBtn = () => {

    return(
        <div>
            <a href="http://localhost:5000/api/ggauth/login/">Login to Google</a>
        </div>
    )
}

export default connect(null, { logout })(GGLoginBtn);