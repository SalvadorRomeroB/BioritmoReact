import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { update_created_events } from "../components/API_Req/eventsApi";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Layout from "../components/Layout";

const useStyles = makeStyles((theme) => ({
  event: {
    paddingBottom: 3,
  },
  inputFields: {
    minWidth: 350,
    margin: "1%",
  },
  specialInput: {
    minWidth: 300,
    margin: "1%",
  },
  formButton: {
    marginTop: 10,
  },
}));

const Create_event = () => {
  const [token] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector((state) => state.user);
  let selected_event = useSelector((state) => state.selected_event);
  const [name, setName] = useState(selected_event.name);
  const [description, setDescription] = useState(selected_event.description);
  const [tag, setTag] = useState(selected_event.tag);
  const [location, setLocation] = useState(selected_event.location);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [day, setDay] = useState(selectedDate.getDate());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDay(selectedDate.getDate());
    setMonth(selectedDate.getMonth());
    setYear(selectedDate.getFullYear());
  };
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
    update_created_events(token, selected_event.id, event);
    setName("");
    setDescription("");
    setTag("");
    setLocation("");
    setYear(0);
    setMonth(0);
    setDay(0);
  };

  const form = () => (
    <>
      <Grid container direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <TextField
            className={classes.inputFields}
            required
            label="Name of the event"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            className={classes.inputFields}
            required
            id="standard-basic"
            label="Location of the event"
            variant="filled"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center">
        <Grid item xs={12} md={6}>
          <TextField
            className={classes.inputFields}
            required
            label="Description"
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows="4"
          />
        </Grid>
        <Grid item xs={10} md={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.specialInput}
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl required className={classes.specialInput}>
            <InputLabel>Tag</InputLabel>
            <Select value={tag} onChange={(e) => setTag(e.target.value)}>
              <MenuItem value={"FISICO"}>PHYSICAL</MenuItem>
              <MenuItem value={"EMOCIONAL"}>EMOTIONAL</MenuItem>
              <MenuItem value={"INTELECTUAL"}>INTELECTUAL</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Button
          disabled={
            ((name && description && tag && tag) !== "" ? false : true) &&
            ((year && month && day) !== 0 ? false : true)
          }
          variant="outlined"
          size="large"
          className={classes.formButton}
          onClick={(e) => create_event(e)}
        >
          Create Event
        </Button>
      </Grid>
    </>
  );
  const classes = useStyles();
  return (
    <Layout title="Home">
      <Grid container justify="center">
        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          {form()}
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Layout>
  );
};

export default Create_event;
