import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register_user } from "../redux/actions/index";

import Layout from "../components/Layout";
import Colors from "../constants/Colors";
import FileBase64 from "react-file-base64";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [image, setImage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let info_user = {
      email: email,
      password: password,
      user_name: userName,
      year: year,
      month: month,
      day: day,
      image: image,
    };
    dispatch(register_user(info_user));
    setEmail("");
    setPassword("");
    setUsername("");
    setYear(0);
    setMonth(0);
    setDay(0);
  };

  const getFiles = (file) => {
    setImage(
      file.base64
        .replace("data:image/png;base64,", "")
        .replace("data:image/jpg;base64,", "")
        .replace("data:image/jpeg;base64,", "")
    );
  };

  const classes = useStyles();

  return (
    <Layout>
      <Container maxWidth="xs" className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Register
        </Typography>
        <Grid container className={classes.form} spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="filled-required"
              label="Email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="filled-required"
              label="User Name"
              variant="filled"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-number"
              label="Year with 4 digits"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-number"
              label="Month"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-number"
              label="Day with number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </Grid>
          <FileBase64 onDone={getFiles.bind(this)} />
          <Grid item xs={12}>
            <Button
              disabled={
                (email && password && userName) !== "" &&
                (year && month && day) !== 0
                  ? false
                  : true
              }
              variant="outlined"
              size="large"
              className={classes.formButton}
              onClick={(e) => handleLogin(e)}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Signin;
