import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Colors from "../constants/Colors";
import Navbar from "./Navbar";

const useStyles = makeStyles(theme => ({
  root: {
    background: Colors.primary,
    borderRadius: 15,
    color: Colors.white,
    maxHeight: 1000,
    height: 600
  }
}));

const Layout = props => {
  const classes = useStyles();

  return (
    <Grid>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12} md={12}>
        <Container maxWidth="lg" className={classes.root}>
          <Grid item xs={10}>
            {props.children}
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Layout;
