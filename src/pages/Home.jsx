import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../constants/Colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { put_new_user, get_created_events } from "../redux/actions/index";
import FileBase64 from "react-file-base64";

import Layout from "../components/Layout";
import {
  new_event,
  add_my_events,
  update_created_events,
} from "../components/API_Req/eventsApi";
import { new_user } from "../components/API_Req/userApi";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    padding: 50,
  },
  root: {
    background: Colors.three,
    borderRadius: 15,
    height: 600,
    marginTop: 20,
  },
  form: {
    marginTop: 10,
    textAlign: "center",
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const [token] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector((state) => state.user);
  const [image, setImage] = useState("");

  const classes = useStyles();

  const getFiles = (file) => {
    console.log(file);
    file.base64.replace("data:image/png;base64,", "");
    setImage(file.base64.replace("data:image/png;base64,", ""));
  };
  return (
    <Layout title="Home">
      <h1>Home</h1>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => new_event(token, user.id)}
      >
        New Event
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => add_my_events(token, user.id, 1)}
      >
        Add to my Events
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => dispatch(put_new_user(token, user.id))}
      >
        Update User
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => new_user()}
      >
        Create New User
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => dispatch(get_created_events(token, user.id))}
      >
        Events created by User
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => update_created_events(token)}
      >
        Update Created Event
      </Button>
    </Layout>
  );
};

export default Home;
