import React from "react";
import { Grid, Typography } from "@material-ui/core";

import Colors from "../constants/Colors";

const ShowBio = (props) => {
  return (
    <Grid item xs container direction="row">
      <Grid item xs={4}>
        <Typography gutterBottom variant="body" style={{ color: Colors.grey }}>
          Physical: {props.fisico}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography gutterBottom variant="body" style={{ color: Colors.grey }}>
          Emotional: {props.emocional}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography gutterBottom variant="body" style={{ color: Colors.grey }}>
          Intelectual: {props.intelectual}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ShowBio;
