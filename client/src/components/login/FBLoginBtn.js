import React from 'react';
import PropTypes from 'prop-types';
import { FacebookLoginButton } from 'react-social-login-buttons';

const FBLoginBtn = ({ setUserLoading }) => {
    return (
        <div>
            <a
                id="login-link"
                href="http://www.budgetbattle.io/api/fbauth/login/"
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

export default FBLoginBtn;
