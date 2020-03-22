import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Layout from "../components/Layout";
import Colors from "../constants/Colors";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
    padding: 50
  },
  root: {
    background: Colors.three,
    borderRadius: 15,
    height: 600,
    marginTop: 20
  },
  form: {
    marginTop: 10,
    textAlign: "center"
  }
}));

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = e => {
    e.preventDefault();

    axios
      .post("/users/signin", {
        email: email,
        password: password
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    setEmail("");
    setPassword("");
  };

  const classes = useStyles();

  return (
    <Layout>
      <Container maxWidth="xs" className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Login
        </Typography>
        <Grid container className={classes.form} spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="filled-required"
              label="Email"
              variant="filled"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="filled-password-input"
              label="Password"
              type="password"
              variant="filled"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={(email && password) !== "" ? false : true}
              variant="outlined"
              size="large"
              className={classes.formButton}
              onClick={e => handleLogin(e)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Signin;
