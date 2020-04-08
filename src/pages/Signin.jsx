import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { sign_in } from "../redux/actions/index";
import { Redirect } from "react-router-dom";

import Layout from "../components/Layout";
import Colors from "../constants/Colors";
import {
  isAuthenticated,
  authenticate,
  login,
} from "../components/Auth/checkAuth";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    padding: 50,
  },
  root: {
    background: Colors.three,
    borderRadius: 15,
    height: 600,
    marginTop: 20,
  },
  form: {
    marginTop: 10,
    textAlign: "center",
  },
}));

const Signin = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
    redirectUsr: false,
  });

  const { email, password, redirectUsr } = values;

  const handleChange = (input) => (event) => {
    setValues({ ...values, error: false, [input]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(sign_in(email, password));
    const data = await login(email, password);
    authenticate(data, () => {
      if (isAuthenticated()) {
        setValues({ email: "", password: "", redirectUsr: true });
      }
    });
  };

  //FORM
  const loginForm = () => (
    <div>
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
            onChange={handleChange("email")}
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
            onChange={handleChange("password")}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            disabled={(email && password) !== "" ? false : true}
            variant="outlined"
            size="large"
            className={classes.formButton}
            onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  const redirectUser = () => {
    if (redirectUsr) {
      return <Redirect to="/" />;
    }
  };

  const redirectFromRegister = () => {
    if (localStorage.getItem("jwt")) {
      return <Redirect to="/" />;
    }
  };

  const classes = useStyles();

  return (
    <Layout>
      <Container maxWidth="xs" className={classes.root}>
        {redirectFromRegister()}
        {loginForm()}
        {redirectUser()}
      </Container>
    </Layout>
  );
};

export default Signin;
