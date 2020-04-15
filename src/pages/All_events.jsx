import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { get_all_events } from "../redux/actions/index";
import {
  get_bio_fisico,
  get_bio_emocional,
  get_bio_intelectual,
} from "../components/BiorythmCalc";
import { add_my_events } from "../components/API_Req/eventsApi";
import Carousel from "react-material-ui-carousel";
import { Grid, Hidden } from "@material-ui/core";
import EventCard from "../components/EventCard";
import CarouselCard from "../components/CarouselCard";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import Layout from "../components/Layout";
import { InlineWrapper } from "@material-ui/pickers/wrappers/InlineWrapper";

const useStyles = makeStyles({
  event: {
    paddingBottom: 3,
  },

  carousel: {
    textAlign: "center",
  },
});

const All_events = () => {
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem("jwt") || "");
  let user = useSelector((state) => state.user);
  let eventsList = useSelector((state) => state.all_events);

  useEffect(() => {
    dispatch(get_all_events(token));
  }, [dispatch, token]);

  const add_event_to_my_events = (e, event_id) => {
    e.preventDefault();
    add_my_events(token, user.id, event_id);
  };

  const carrousel = () => (
    <Carousel>
      {eventsList.slice(0, 6).map((event) => (
        <CarouselCard
          tag={event.tag}
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
            size="small"
            color="primary"
            onClick={(e) => add_event_to_my_events(e, event.id)}
          >
            Add to my Events
          </Button>
        </CarouselCard>
      ))}
    </Carousel>
  );

  const displayAll = () => (
    <>
      <div style={{ display: InlineWrapper }}>
        <p>
          <b>Fisico =</b>{" "}
          <FiberManualRecordIcon
            style={{ fill: "green" }}
          ></FiberManualRecordIcon>
        </p>
        <p>
          <b>Emocional =</b>{" "}
          <FiberManualRecordIcon
            style={{ fill: "red" }}
          ></FiberManualRecordIcon>
        </p>
        <p>
          <b>Intelectual =</b>{" "}
          <FiberManualRecordIcon
            style={{ fill: "yellow" }}
          ></FiberManualRecordIcon>
        </p>
      </div>
      {eventsList.map((event) => (
        <EventCard
          tag={event.tag}
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
            className={classes.btn}
            size="small"
            color="primary"
            onClick={(e) => add_event_to_my_events(e, event.id)}
          >
            Add to my Events
          </Button>
        </EventCard>
      ))}
    </>
  );

  const classes = useStyles();
  return (
    <Layout title="All Events">
      <Grid container spacing={0}>
        <Grid item xs={0} md={2} />
        <Hidden only={"xs"}>
          <Grid item xs={12} md={8} className={classes.carousel}>
            {carrousel()}
          </Grid>
        </Hidden>
        <Grid item xs={0} md={2} />

        <Grid item xs={12} md={12} className={classes.carousel}>
          {displayAll()}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default All_events;
