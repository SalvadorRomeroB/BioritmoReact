import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { get_created_events } from "../redux/actions/index";
import {
  get_bio_fisico,
  get_bio_emocional,
  get_bio_intelectual
} from "../components/BiorythmCalc";

import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  event: {
    paddingBottom: 3
  }
}));

const Created_events = () => {
  const dispatch = useDispatch();
  const [token] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector(state => state.user);
  let eventsList = useSelector(state => state.created_events);

  useEffect(() => {
    dispatch(get_created_events(token, user.id));
  }, [dispatch]);

  const classes = useStyles();
  return (
    <Layout title="Home">
      <h1>Created Events</h1>
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
        </div>
      ))}
    </Layout>
  );
};

export default Created_events;
