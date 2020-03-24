import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../constants/Colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { get_all_events, get_my_events } from "../redux/actions/index";

import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
    padding: 50
  },
  root: {
    background: Colors.three,
    borderRadius: 15,
    height: 600,
    marginTop: 20
  },
  form: {
    marginTop: 10,
    textAlign: "center"
  }
}));

const Home = () => {
  const dispatch = useDispatch();
  const [token, setToken] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector(state => state.user);

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
  };

  const all_events = () => {
    axios
      .get("/businesses", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function(response) {
        dispatch(get_all_events(response.data.data));
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
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
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const classes = useStyles();
  return (
    <Layout>
      <h1>Home</h1>
      <p>Token {token}</p>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => handleLogOut()}
      >
        Log Out
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => all_events()}
      >
        All Events
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => my_events()}
      >
        My Events
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => my_events()}
      >
        New Event
      </Button>
    </Layout>
  );
};

export default Home;
