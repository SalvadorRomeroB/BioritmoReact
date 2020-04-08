import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import All_Events from "./pages/All_events";
import My_Events from "./pages/My_events";
import Created_Events from "./pages/Created_events";
import Create_Event from "./pages/Create_event";
import Edit_Event from "./pages/Update_event";
import Register from "./pages/Register.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={All_Events} />

        <Route path="/signin" exact component={Signin} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/my-events" exact component={My_Events} />
        <PrivateRoute path="/created-events" exact component={Created_Events} />
        <PrivateRoute path="/new-event" exact component={Create_Event} />
        <PrivateRoute path="/edit-event" exact component={Edit_Event} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
