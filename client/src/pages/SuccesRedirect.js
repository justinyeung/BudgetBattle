import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUser, setLoading } from "../actions/userActions";

const SuccessRedirect = ({ getUser, setLoading, user: { user, loading } }) => {
  useEffect(() => {
    setLoading();
    if (loading === false) {
      getUser();
    }
  }, []);

  const getUserFn = () => {
    setLoading();
    getUser();
  };

  return (
    <div>
      {user && user.name}
      {loading ? "Loading" : "Not Loading"}
      <button onClick={getUserFn}>Click to Get User</button>
    </div>
  );
};

SuccessRedirect.propTypes = {
  getUser: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUser, setLoading })(
  SuccessRedirect
);
