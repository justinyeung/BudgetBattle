import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLoginButton } from 'react-social-login-buttons';

const GGLoginBtn = ({ setUserLoading }) => {
    return (
        <div>
            <a
                id="login-link"
                href="https://www.budgetbattle.io/api/ggauth/login/"
                onClick={setUserLoading}
            >
                <GoogleLoginButton />
            </a>
        </div>
    );
};

GGLoginBtn.propTypes = {
    setUserLoading: PropTypes.func.isRequired,
};

export default GGLoginBtn;
