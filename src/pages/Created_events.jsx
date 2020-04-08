import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { get_created_events, select_event } from "../redux/actions/index";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

import {
  get_bio_fisico,
  get_bio_emocional,
  get_bio_intelectual,
} from "../components/BiorythmCalc";

import Layout from "../components/Layout";

const useStyles = makeStyles((theme) => ({
  event: {
    paddingBottom: 3,
  },
  links: {
    textDecoration: "none",
    color: "black",
  },
}));

const Created_events = () => {
  const dispatch = useDispatch();
  const [token] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector((state) => state.user);
  let eventsList = useSelector((state) => state.created_events);

  useEffect(() => {
    dispatch(get_created_events(token, user.id));
  }, [dispatch, token, user.id]);

  const add_event_to_my_events = (e, event) => {
    e.preventDefault();
    dispatch(select_event(event));
  };

  const classes = useStyles();

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
        >
          <Button
            variant="outlined"
            size="large"
            className={classes.formButton}
            onClick={(e) => add_event_to_my_events(e, event)}
          >
            <Link className={classes.links} to="/edit-event">
              Edit Event
            </Link>
          </Button>
        </EventCard>
      ))}
    </>
  );

  return (
    <Layout title={`Events Created by ${user.user_name}`}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12} className={classes.center}>
          {displayAll()}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Created_events;
