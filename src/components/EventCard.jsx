import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core";
import ShowBio from "./ShowBio";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import Colors from "../constants/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
  },
  paper: {
    padding: theme.spacing(2),
    margin: 5,
    maxWidth: 350,
    height: 300,
    backgroundColor: Colors.three,
  },
  btn: {},
}));

const EventCard = (props) => {
  const classes = useStyles();
  console.log(props);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={4}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {props.description}
                </Typography>
                {props.tag == "FISICO" && (
                  <FiberManualRecordIcon
                    style={{ fill: "green" }}
                  ></FiberManualRecordIcon>
                )}
                {props.tag == "EMOCIONAL" && (
                  <FiberManualRecordIcon
                    style={{ fill: "red" }}
                  ></FiberManualRecordIcon>
                )}
                {props.tag == "INTELECTUAL" && (
                  <FiberManualRecordIcon
                    style={{ fill: "yellow" }}
                  ></FiberManualRecordIcon>
                )}

                <ShowBio
                  fisico={props.fisico}
                  emocional={props.emocional}
                  intelectual={props.intelectual}
                />
              </Grid>
              <Grid item className={classes.btn}>
                {props.children}
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{props.fecha}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default EventCard;
