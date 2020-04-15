import React, { useState } from "react";
import {
  Paper,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimelineIcon from "@material-ui/icons/Timeline";
import { put_new_user } from "../redux/actions/index";
import Colors from "../constants/Colors";
import Layout from "../components/Layout";
import Chart from "../components/Chart";
import {
  bio_fisico,
  bio_emocional,
  bio_intelectual,
  setDateRange,
  makeBioList,
} from "../components/BiorythmCalc";
import { useSelector } from "react-redux";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    background: Colors.secondary,
    borderRadius: 15,
    minHeight: 600,
    marginTop: 20,
  },
  customButton: {
    transform: "scale(1.5)",
    color: Colors.white,
    borderRadius: 15,
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: Colors.primary,
    "&:hover": {
      backgroundColor: Colors.primary,
    },
  },
  centerItem: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    color: Colors.white,
  },

  bioInfo: {
    marginTop: "7%",
    marginBottom: "7%",
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 15,
  },
  imageStyle: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  inputName: {
    width: 150,
    margin: "5%",
  },
  specialInput: {
    width: 260,
  },
  formButton: {
    margin: "5%",
  },
}));

const Profile = () => {
  let date = new Date();

  const dispatch = useDispatch();

  const classes = useStyles();
  let user = useSelector((state) => state.user);
  const [token] = React.useState(localStorage.getItem("jwt") || "");
  const [userName, setUsername] = useState(user.user_name);
  const [dates, setDates] = useState([]);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    fisico: [],
    emocional: [],
    intelectual: [],
  });
  const [selectedDate, setSelectedDate] = useState(
    new Date(user.year, user.month - 1, user.day)
  );
  const [year, setYear] = useState(user.year);
  const [month, setMonth] = useState(user.month);
  const [day, setDay] = useState(user.day);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };
  const [biorythm] = useState({
    physical: bio_fisico(
      date,
      new Date(`${user.month}/${user.day}/${user.year}`)
    ),
    emotional: bio_emocional(
      date,
      new Date(`${user.month}/${user.day}/${user.year}`)
    ),
    intelect: bio_intelectual(
      date,
      new Date(`${user.month}/${user.day}/${user.year}`)
    ),
  });

  const { physical, emotional, intelect } = biorythm;
  const { fisico, emocional, intelectual } = data;

  const handleClick = () => {
    setDates(setDateRange());
    setData({
      fisico: makeBioList(bio_fisico, user),
      emocional: makeBioList(bio_emocional, user),
      intelectual: makeBioList(bio_intelectual, user),
    });

    visible ? setVisible(false) : setVisible(true);
  };

  const edit_user = (e) => {
    e.preventDefault();
    const info_user = {
      user_name: userName,
      year: year,
      month: month,
      day: day,
    };
    dispatch(put_new_user(token, user.id, info_user));
    // setUsername(newUser.user_name);
    // setYear(newUser.year);
    // setMonth(newUser.month);
    // setDay(newUser.day);
  };

  return (
    <Layout title="Profile">
      <Container maxWidth="md" className={classes.root}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={6} className={classes.bioInfo}>
              <Typography gutterBottom variant="h4" className={classes.title}>
                Today's Biorythm
              </Typography>
              <Paper>
                <Typography
                  gutterBottom
                  variant="h5"
                  className={classes.data}
                  style={{ color: Colors.green }}
                >
                  Physical: {physical}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ color: Colors.three }}
                >
                  Emotional: {emotional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ color: Colors.four }}
                >
                  Intelectual: {intelect}
                </Typography>
              </Paper>
            </Paper>
            <Grid item>
              <Paper className={classes.centerItem}>
                <img
                  alt=""
                  className={classes.imageStyle}
                  src={`data:image/jpeg;base64,${user.image}`}
                />
                <TextField
                  className={classes.inputName}
                  required
                  id="standard-basic"
                  label="Username"
                  value={userName}
                  defaultValue={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.specialInput}
                    margin="normal"
                    id="date-picker-dialog"
                    label="Birth Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Button
                  disabled={
                    (userName !== "" ? false : true) &&
                    ((year && month && day) !== 0 ? false : true)
                  }
                  variant="outlined"
                  size="large"
                  className={classes.formButton}
                  onClick={(e) => edit_user(e)}
                >
                  Save User
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Grid item md={1} />
          <Grid item xs={12} md={7} className={classes.centerItem}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<TimelineIcon />}
              onClick={() => handleClick()}
            >
              {visible ? "Hide Graph" : "Check biorythm graph"}
            </Button>

            <Grid item xs={12} md={11}>
              <Paper elevation={6}>
                {visible ? (
                  <Chart
                    fisico={fisico}
                    emocional={emocional}
                    intelectual={intelectual}
                    dates={dates}
                  />
                ) : (
                  <div />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Profile;
