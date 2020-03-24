import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
