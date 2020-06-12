import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GoogleLoginButton } from "react-social-login-buttons";
import { setUserLoading } from "../../actions/userActions";

const GGLoginBtn = ({ setUserLoading }) => {
  return (
    <div>
      <a
        id="login-link"
        href="http://localhost:5000/api/ggauth/login/"
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

export default connect(null, { setUserLoading })(GGLoginBtn);
