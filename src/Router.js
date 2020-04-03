import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import All_Events from "./pages/All_events";
import My_Events from "./pages/My_events";
import Created_Events from "./pages/Created_events";
import Create_Event from "./pages/Create_event";
import Edit_Event from "./pages/Update_event";
import Register from "./pages/Register.jsx";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/all-events" exact component={All_Events} />
        <Route path="/my-events" exact component={My_Events} />
        <Route path="/created-events" exact component={Created_Events} />
        <Route path="/new-event" exact component={Create_Event} />
        <Route path="/edit-event" exact component={Edit_Event} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
