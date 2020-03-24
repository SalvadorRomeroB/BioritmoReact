import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../constants/Colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_events,
  get_my_events,
  put_new_user,
  sign_in
} from "../redux/actions/index";

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

  const new_event = () => {
    let new_event = {
      business: {
        name: "event with user",
        description: "something important",
        tag: "FISICO",
        location: "my casa",
        year: 2020,
        month: 12,
        day: 31
      }
    };
    axios({
      method: "post",
      url: `/businesses/create/${user.id}`,
      headers: {
        Authorization: "Bearer " + token
      },
      data: new_event
    })
      .then(function(response) {
        console.log(response.data);
        my_events();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const add_my_events = event_id => {
    axios({
      method: "post",
      url: `/businesses/add/${user.id}/${event_id}`,
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        console.log(response.data);
        my_events();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const update_user = () => {
    let info_new_user = {
      user: {
        email: "newuserreact10@business.com",
        password: "password",
        user_name: "Antonio",
        year: 1998,
        month: 4,
        day: 22
      }
    };
    axios({
      method: "put",
      url: `/user/${user.id}`,
      headers: {
        Authorization: "Bearer " + token
      },
      data: info_new_user
    })
      .then(function(response) {
        console.log(response.data);
        dispatch(put_new_user(response.data));
        dispatch(get_my_events(response.data.events));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const new_user = () => {
    let info_new_user = {
      user: {
        email: "user6@business.com",
        password: "password",
        user_name: "Luis",
        year: 1998,
        month: 4,
        day: 22
      }
    };
    axios({
      method: "post",
      url: `/users/signup`,
      data: info_new_user
    })
      .then(function(response) {
        dispatch(sign_in(response.data));
        localStorage.setItem("jwt", response.data.token);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const classes = useStyles();
  return (
    <Layout>
      <h1>Home</h1>
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
        onClick={() => new_event()}
      >
        New Event
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => add_my_events(6)}
      >
        Add to my Events
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => update_user()}
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
    </Layout>
  );
};

export default Home;
