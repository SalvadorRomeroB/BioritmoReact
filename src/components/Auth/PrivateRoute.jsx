import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./checkAuth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
);

export default PrivateRoute;
