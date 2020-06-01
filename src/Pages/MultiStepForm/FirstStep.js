import React, { Fragment, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../Context/UserContext";

// Destructure props
const FirstStep = ({
  handleNext,
  handleChange,
  values: { username },
  filedError,
  isError,
}) => {
  const { userContext, setUserContext } = useContext(UserContext);
  console.log("userContext", userContext.firstName);
  // Check if all values are not empty
  const isEmpty = username.length > 0;
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Generate Username
      </Typography>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            placeholder="Your username..."
            autoComplete="off"
            defaultValue={username}
            onChange={handleChange("username")}
            margin="normal"
            error={filedError.username !== ""}
            helperText={
              filedError.username !== "" ? `${filedError.username}` : ""
            }
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="overline" display="block" gutterBottom>
            https://happylinks.com/{userContext.username}
          </Typography>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          disabled={!isEmpty || isError}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default FirstStep;
