import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core";
import ShowBio from "./ShowBio";

import Colors from "../constants/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
  },
  paper: {
    padding: theme.spacing(2),
    margin: 5,
    width: 800,
    height: 300,
    backgroundColor: Colors.three,
  },
}));

const CarouselCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={4}>
              <Grid item xs>
                <Typography gutterBottom variant="h2">
                  {props.title}
                </Typography>
                <Typography variant="h5" color="textSecondary">
                  Description: {props.description}
                </Typography>
                <ShowBio
                  fisico={props.fisico}
                  emocional={props.emocional}
                  intelectual={props.intelectual}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">{props.children}</Typography>
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
export default CarouselCard;
