import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { register_user } from "../redux/actions/index";

import Layout from "../components/Layout";
import Colors from "../constants/Colors";
import FileBase64 from "react-file-base64";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    padding: 50,
  },
  root: {
    background: Colors.three,
    borderRadius: 15,
    maxHeight: 800,
    marginTop: 20,
  },
  form: {
    marginTop: 10,
    textAlign: "center",
  },
  invisible: {
    display: "none",
  },
}));

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [day, setDay] = useState(selectedDate.getDate());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDay(selectedDate.getDate());
    setMonth(selectedDate.getMonth());
    setYear(selectedDate.getFullYear());
  };

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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.specialInput}
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload File
              <div className={classes.invisible}>
                <FileBase64 onDone={getFiles.bind(this)} />
              </div>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={
                ((email && password && userName) !== "" ? false : true) &&
                ((year && month && day) !== 0 ? false : true)
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
