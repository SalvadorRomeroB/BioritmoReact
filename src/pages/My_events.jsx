import React, { useEffect, useState } from "react";
import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { get_my_events } from "../redux/actions/index";
import {
  get_bio_fisico,
  get_bio_emocional,
  get_bio_intelectual,
} from "../components/BiorythmCalc";

import Layout from "../components/Layout";
import EventCard from "../components/EventCard";

const useStyles = makeStyles((theme) => ({
  event: {
    paddingBottom: 3,
  },
  center: {
    textAlign: "center",
  },
}));

const My_events = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [token] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector((state) => state.user);
  let eventsList = useSelector((state) => state.my_events);

  useEffect(() => {
    dispatch(get_my_events(token, user.id));
  }, [dispatch, token, user.id]);

  const displayAll = () => (
    <>
      {eventsList.map((event) => (
        <EventCard
          title={event.name}
          description={event.description}
          fisico={get_bio_fisico(
            event.year,
            event.month,
            event.day,
            user.month,
            user.day,
            user.year
          )}
          emocional={get_bio_emocional(
            event.year,
            event.month,
            event.day,
            user.month,
            user.day,
            user.year
          )}
          intelectual={get_bio_intelectual(
            event.year,
            event.month,
            event.day,
            user.month,
            user.day,
            user.year
          )}
          fecha={`${event.day}/${event.month}/${event.year}`}
        ></EventCard>
      ))}
    </>
  );
  return (
    <Layout title="My Events">
      <Grid container spacing={0}>
        <Grid item xs={12} md={12} className={classes.center}>
          {displayAll()}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default My_events;
