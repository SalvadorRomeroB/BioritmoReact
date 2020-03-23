import React, { useState } from "react";
import { Paper, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimelineIcon from "@material-ui/icons/Timeline";

import Colors from "../constants/Colors";
import Layout from "../components/Layout";
import Chart from "../components/Chart";
import {
  bio_fisico,
  bio_emocional,
  bio_intelectual,
  setDateRange,
  makeBioList
} from "../components/BiorythmCalc";

const useStyles = makeStyles(theme => ({
  root: {
    background: Colors.secondary,
    borderRadius: 15,
    height: 600,
    marginTop: 20
  },
  customButton: {
    transform: "scale(1.5)",
    color: Colors.white,
    borderRadius: 15,
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: Colors.primary,
    "&:hover": {
      backgroundColor: Colors.primary
    }
  },
  centerItem: {
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    color: Colors.white
  },

  bioInfo: {
    marginTop: "7%",
    marginBottom: "7%",
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 15
  }
}));

const Profile = () => {
  let date = new Date();

  const classes = useStyles();

  const [dates, setDates] = useState([]);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    fisico: [],
    emocional: [],
    intelectual: []
  });
  const [biorythm] = useState({
    physical: bio_fisico(date),
    emotional: bio_emocional(date),
    intelect: bio_intelectual(date)
  });

  const { physical, emotional, intelect } = biorythm;
  const { fisico, emocional, intelectual } = data;

  const handleClick = () => {
    setDates(setDateRange());
    setData({
      fisico: makeBioList(bio_fisico),
      emocional: makeBioList(bio_emocional),
      intelectual: makeBioList(bio_intelectual)
    });

    visible ? setVisible(false) : setVisible(true);
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
          <Grid
            item
            xs={12}
            md={7}
            className={classes.centerItem}
            direction="row"
          >
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
      </Container>
    </Layout>
  );
};

export default Profile;
