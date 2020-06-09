import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../components/layout/Spinner";
import { getUser, setLoading } from "../actions/userActions";

const SuccessRedirect = ({ getUser, setLoading, user: { user, loading } }) => {
  useEffect(() => {
    setLoading();
    if (loading === false) {
      getUser();
    }

    // eslint-disable-next-line
  }, []);

  const getUserFn = () => {
    setLoading();
    getUser();
  };

  return (
    <div>
      {!loading && user && user.name}
      {loading && <Spinner />}
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
