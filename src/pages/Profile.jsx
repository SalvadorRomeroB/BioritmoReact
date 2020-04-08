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
import { update_user } from "../components/API_Req/userApi";
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

const useStyles = makeStyles((theme) => ({
  root: {
    background: Colors.secondary,
    borderRadius: 15,
    height: 600,
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
}));

const Profile = () => {
  let date = new Date();

  const classes = useStyles();
  let user = useSelector((state) => state.user);
  const [token] = React.useState(localStorage.getItem("jwt") || "");

  const [userName, setUsername] = useState(user.user_name);
  const [year, setYear] = useState(user.year);
  const [month, setMonth] = useState(user.month);
  const [day, setDay] = useState(user.day);

  const [dates, setDates] = useState([]);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    fisico: [],
    emocional: [],
    intelectual: [],
  });

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
      email: user.email,
      password: user.password,
      user_name: userName,
      year: year,
      month: month,
      day: day,
    };
    let newUser = update_user(token, user.id, info_user);
    setUsername(newUser.user_name);
    setYear(newUser.year);
    setMonth(newUser.month);
    setDay(newUser.day);
  };

  return (
    <Layout title="Profile">
      <Container maxWidth="md" className={classes.root}>
        <Grid container direction="row">
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
          </Grid>
          <Grid item md={1} />
          <Grid item xs={12} md={7} className={classes.centerItem}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<TimelineIcon />}
              onClick={() => handleClick()}
              className={classes.customButton}
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

        <TextField
          required
          id="standard-basic"
          label="Username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Button
          disabled={
            userName !== "" && (year && month && day) !== 0 ? false : true
          }
          variant="outlined"
          size="large"
          className={classes.formButton}
          onClick={(e) => edit_user(e)}
        >
          Save User
        </Button>
        <img
          className={classes.imageStyle}
          src={`data:image/jpeg;base64,${user.image}`}
        />
      </Container>
    </Layout>
  );
};

export default Profile;
