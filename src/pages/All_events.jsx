import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { get_all_events } from "../redux/actions/index";
import {
  get_bio_fisico,
  get_bio_emocional,
  get_bio_intelectual
} from "../components/BiorythmCalc";
import { add_my_events } from "../components/API_Req/eventsApi";

import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  event: {
    paddingBottom: 3
  }
}));

const All_events = () => {
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem("jwt") || "");
  let user = useSelector(state => state.user);
  let eventsList = useSelector(state => state.all_events);

  useEffect(() => {
    dispatch(get_all_events(token));
  }, [dispatch]);

  const add_event_to_my_events = (e, event_id) => {
    e.preventDefault();
    add_my_events(token, user.id, event_id);
  };

  const classes = useStyles();
  return (
    <Layout title="Home">
      <h1>All Events</h1>

      {eventsList.map((event, i) => (
        <div key={i} className={classes.event}>
          <div>
            <h1>{event.name}</h1>
            <p>id: {event.id}</p>
            <p>{event.description}</p>
            <p>
              Fecha del evento: {event.day}/{event.month}/{event.year}
            </p>
            <p>
              Fisico:{" "}
              {get_bio_fisico(
                event.year,
                event.month,
                event.day,
                user.month,
                user.day,
                user.year
              )}
            </p>
            <p>
              Emocional:{" "}
              {get_bio_emocional(
                event.year,
                event.month,
                event.day,
                user.month,
                user.day,
                user.year
              )}
            </p>
            <p>
              Intelectual:
              {get_bio_intelectual(
                event.year,
                event.month,
                event.day,
                user.month,
                user.day,
                user.year
              )}
            </p>
          </div>
          <Button
            variant="outlined"
            size="large"
            className={classes.formButton}
            onClick={e => add_event_to_my_events(e, event.id)}
          >
            Add to my events
          </Button>
        </div>
      ))}
    </Layout>
  );
};

export default All_events;
