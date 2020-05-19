import React from "react";

import { FacebookLoginButton } from "react-social-login-buttons";

const FBLoginBtn = () => {
  return (
    <div>
      <a id="login-link" href="http://localhost:5000/api/fbauth/login/">
        <FacebookLoginButton />
      </a>
    </div>
  );
};

export default FBLoginBtn;
