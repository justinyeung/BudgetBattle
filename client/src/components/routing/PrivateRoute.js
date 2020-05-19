import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route } from "react-router-dom";

import { getUser } from "../../actions/userActions";

const PrivateRoute = ({
  getUser,
  user: { user },
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {localStorage.getItem("isLoggedIn") || user !== null ? (
        <Route {...rest} render={Component} />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

PrivateRoute.propTypes = {
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUser })(PrivateRoute);
