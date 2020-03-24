import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../constants/Colors";

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
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
  };

  const [token, setToken] = React.useState(localStorage.getItem("jwt") || "");
  const classes = useStyles();
  return (
    <Layout title="Home">
      <h1>Home</h1>
      <p>Token {token}</p>
      <Button
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={() => handleLogOut()}
      >
        Login
      </Button>
    </Layout>
  );
};

export default Home;
