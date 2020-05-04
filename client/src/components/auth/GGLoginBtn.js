import React from 'react';

import { GoogleLoginButton } from 'react-social-login-buttons';

const GGLoginBtn = () => {

    return(
        <div>
            <a href="http://localhost:5000/api/ggauth/login/">
                <GoogleLoginButton />
            </a>
        </div>
    )
}

export default GGLoginBtn;