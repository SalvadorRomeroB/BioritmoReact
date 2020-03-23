import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    marginTop: 5
  }
}));

const Layout = props => {
  const classes = useStyles();

  return (
    <div>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Typography variant="h3" className={classes.title}>
        {props.title}
      </Typography>
      <Grid item xs={12}>
        {props.children}
      </Grid>
    </div>
  );
};

export default Layout;
