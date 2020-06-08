import React from "react";
import { Grid, Hidden, Avatar } from "@material-ui/core";

const SettingsPage = ({ match }) => {
  console.log("match", match);
  return (
    <div style={{ maxWidth: "99.2%" }}>
      <p>{match.params.settingsPath}</p>

      <Grid container spacing={2} justify="center">
        <Grid item xs={11} sm={3}>
          <p>Grid 1</p>
        </Grid>

        <Grid item xs={11} sm={7}>
          <p>grid 2</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsPage;
