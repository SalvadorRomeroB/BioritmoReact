import React, { useState } from "react";
import "date-fns";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
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
  const classes = useStyles();
  const [token] = React.useState(localStorage.getItem("jwt") || "");
  let user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    new_event(token, user.id, event);
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

  return (
    <Layout title="Create Event">
      <Grid container justify="center">
        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          {form()}
        </Grid>
        <Grid item md={2} />
      </Grid>
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

{
  /* <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid> */
}
