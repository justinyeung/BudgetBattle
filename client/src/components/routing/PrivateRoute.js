import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import Spinner from "../layout/Spinner";
import { getUser, setLoading } from "../../actions/userActions";

const PrivateRoute = ({
  getUser,
  user: { user, loading },
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    setLoading();
    getUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {!loading && user !== null && <Route {...rest} render={Component} />}
      {!loading && user === null && <Redirect to="/login" />}
    </div>
  );
};

PrivateRoute.propTypes = {
  getUser: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUser, setLoading })(PrivateRoute);
