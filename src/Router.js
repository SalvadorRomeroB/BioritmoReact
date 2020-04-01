import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import All_Events from "./pages/All_events";
import My_Events from "./pages/My_events";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/all-events" exact component={All_Events} />
        <Route path="/my-events" exact component={My_Events} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
