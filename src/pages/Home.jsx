import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

import Layout from "../components/Layout";

const useStyles = makeStyles((theme) => ({}));

const Home = () => {
  const classes = useStyles();

  let user = useSelector((state) => state.user);

  return <Layout title="Test"></Layout>;
};

export default Home;
