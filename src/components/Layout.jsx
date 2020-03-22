import React from "react";
import Grid from "@material-ui/core/Grid";

import Navbar from "./Navbar";

const Layout = props => {
  return (
    <div>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12}>
        {props.children}
      </Grid>
    </div>
  );
};

export default Layout;
