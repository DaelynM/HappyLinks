//bbspsmgb 18866693995

import React, { Fragment, useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../Context/UserContext";
import firebase, { firestore } from "../../Firebase/firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneIcon from "@material-ui/icons/Done";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";

// Destructure props
const FirstStep = ({
  handleNext,
  handleChange,
  values: { username },
  filedError,
  isError,
}) => {
  const { userContext, setUserContext } = useContext(UserContext);
  // Check if all values are not empty
  var isEmpty = username.length > 0;

  const [taken, setTaken] = useState(null);

  useEffect(() => {
    firestore
      .collection("users")
      .where("username", "==", username)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setTaken(false);
          console.log("no similar username");
        } else {
          console.log(
            "This username has been taken, but now we are checking if it already belongs to you"
          );
          var accessDb = firestore
            .doc(`/users/${userContext.id}`)
            .get()
            .then((snapShot) => {
              return snapShot.data().username;
            });

          accessDb.then((e) => {
            console.log("e", e);
            console.log("eu", username);

            if (e === username) {
              //if theryre both the same then theyre good
              setTaken(false);
            } else {
              setTaken(true);
            }
          });
        }
      });
  });

  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (taken === true || taken === null) {
      return;
    }

    handleNext();
  };

  // const [isEmpty, setIsEmpty] = useState();

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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {taken ? (
                    <ClearIcon color="secondary" />
                  ) : (
                    <CircularProgress size="20px"></CircularProgress>
                  )}
                </InputAdornment>
              ),
            }}
          />
          {taken ? (
            <div>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                color="secondary"
              >
                Username is taken
              </Typography>
            </div>
          ) : (
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              color="primary"
            >
              Valid Username
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="overline" display="block" gutterBottom>
            https://happylinks.com/{username}
          </Typography>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <form onSubmit={handleSubmit}>
          <Button
            variant="contained"
            disabled={!isEmpty || isError || taken}
            color="primary"
            type="submit"
            //onClick={handleNext}
          >
            Next
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default FirstStep;
