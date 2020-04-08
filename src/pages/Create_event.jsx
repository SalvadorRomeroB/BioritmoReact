import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { new_event } from "../components/API_Req/eventsApi";
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
}));

const Create_event = () => {
  const dispatch = useDispatch();
  const [token] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);

  const create_event = (e) => {
    e.preventDefault();
    const event = {
      name: name,
      description: description,
      tag: tag,
      location: location,
      year: year,
      month: month,
      day: day,
      owner: user.id,
    };
    new_event(token, user.id, event);
    setName("");
    setDescription("");
    setTag("");
    setLocation("");
    setYear(0);
    setMonth(0);
    setDay(0);
  };

  const classes = useStyles();
  return (
    <Layout title="Home">
      <h1>Create Event</h1>
      <TextField
        required
        id="standard-basic"
        label="Name of the Events"
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        required
        id="standard-textarea"
        label="Description"
        variant="filled"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows="4"
      />
      <TextField
        required
        id="standard-basic"
        label="Location"
        variant="filled"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <MenuItem value={"FISICO"}>FISICO</MenuItem>
          <MenuItem value={"EMOCIONAL"}>EMOCIONAL</MenuItem>
          <MenuItem value={"INTELECTUAL"}>INTELECTUAL</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <TextField
        id="standard-number"
        label="Year with 4 digits"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <TextField
        id="standard-number"
        label="Month"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <TextField
        id="standard-number"
        label="Day with number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />
      <Button
        disabled={
          (name && description && tag && tag) !== "" &&
          (year && month && day) !== 0
            ? false
            : true
        }
        variant="outlined"
        size="large"
        className={classes.formButton}
        onClick={(e) => create_event(e)}
      >
        Create Event
      </Button>
      <p>Datos para el dia del evento</p>
      <p>
        Fisico:{" "}
        {get_bio_fisico(year, month, day, user.month, user.day, user.year)}
      </p>
      <p>
        Emocional:{" "}
        {get_bio_emocional(year, month, day, user.month, user.day, user.year)}
      </p>
      <p>
        Intelectual:
        {get_bio_intelectual(year, month, day, user.month, user.day, user.year)}
      </p>
    </Layout>
  );
};

export default Create_event;
