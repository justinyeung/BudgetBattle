import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { setUserLoading } from '../../actions/userActions';

const FBLoginBtn = ({ setUserLoading }) => {
    return (
        <div>
            <a
                href="http://localhost:5000/api/fbauth/login/"
                onClick={setUserLoading}
            >
                <FacebookLoginButton />
            </a>
        </div>
    );
};

FBLoginBtn.propTypes = {
    setUserLoading: PropTypes.func.isRequired,
};

export default connect(null, { setUserLoading })(FBLoginBtn);
