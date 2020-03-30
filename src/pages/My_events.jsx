import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { get_my_events } from "../redux/actions/index";
import {
  bio_fisico,
  bio_emocional,
  bio_intelectual
} from "../components/BiorythmCalc";

import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  event: {
    paddingBottom: 3
  }
}));

const My_events = () => {
  const dispatch = useDispatch();
  const [token, setToken] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector(state => state.user);
  let eventsList = useSelector(state => state.my_events);

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
  };

  const my_events = () => {
    axios
      .get(`/user/businesses/${user.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function(response) {
        dispatch(get_my_events(response.data.events));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const get_bio_fisico = (year, month, day) => {
    let date_event = new Date(`${month}/${day}/${year}`);
    let date_user = new Date(`${user.month}/${user.day}/${user.year}`);
    return bio_fisico(date_user, date_event);
  };

  const get_bio_emocional = (year, month, day) => {
    let date_event = new Date(`${month}/${day}/${year}`);
    let date_user = new Date(`${user.month}/${user.day}/${user.year}`);
    return bio_emocional(date_user, date_event);
  };

  const get_bio_intelectual = (year, month, day) => {
    let date_event = new Date(`${month}/${day}/${year}`);
    let date_user = new Date(`${user.month}/${user.day}/${user.year}`);
    return bio_intelectual(date_user, date_event);
  };

  const classes = useStyles();
  return (
    <Layout title="Home">
      <h1>My Events</h1>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => my_events()}
      >
        My Events
      </Button>
      {eventsList.map((event, i) => (
        <div key={i} className={classes.event}>
          <div>
            <h1>{event.name}</h1>
            <p>id: {event.id}</p>
            <p>{event.description}</p>
            <p>
              Fecha del evento: {event.day}/{event.month}/{event.year}
            </p>
            <p>Fisico: {get_bio_fisico(event.year, event.month, event.day)}</p>
            <p>
              Emocional: {get_bio_emocional(event.year, event.month, event.day)}
            </p>
            <p>
              Intelectual:
              {get_bio_intelectual(event.year, event.month, event.day)}
            </p>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default My_events;
