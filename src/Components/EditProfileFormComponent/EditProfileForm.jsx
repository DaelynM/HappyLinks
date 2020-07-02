import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { UserContext } from "../../Context/UserContext";
import firebase, { firestore } from "../../Firebase/firebase";

import CircularProgress from "@material-ui/core/CircularProgress";
import DoneIcon from "@material-ui/icons/Done";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditProfileForm = ({ componentSwitchEp }) => {
  const classes = useStyles();
  const { userContext, setUserContext } = useContext(UserContext);
  const [taken, setTaken] = useState(null);

  //if it already exisit in the seshion then retreive it
  const [updateProfile, setUpdateProfile] = useState({
    shortBio: userContext.shortBio ? userContext.shortBio : "",
    longBio: userContext.longBio ? userContext.longBio : "",
    username: userContext.username ? userContext.username : "",
    country: userContext.country ? userContext.country : "",
  });

  //gets the text from the field and updates state
  const updateField = (e) => {
    setUpdateProfile({
      ...updateProfile,
      [e.target.name]: e.target.value,
    });
  };

  const taskManager = async () => {
    var checker2;
    const checker = await firestore
      .collection("users")
      .where("username", "==", updateProfile.username)
      .get()
      .then(async (snapshot) => {
        if (snapshot.empty) {
          console.log("not taken 1");
          return false;
        } else {
          checker2 = await firestore
            .doc(`/users/${userContext.id}`)
            .get()
            .then((snapShot) => {
              return snapShot.data().username;
            })
            .then((e) => {
              if (e === updateProfile.username) {
                console.log("not taken 2");
                return false;
              } else {
                console.log("taken 1");
                return true;
              }
            });
        }
      });

    if (checker == false) {
      return checker;
    } else {
      return checker2;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newData = await taskManager();
    setTaken(newData);
    console.log("new newData", newData);
    console.log("\n");

    if (newData === true || newData === null) {
      return;
    } else {
      setUserContext({ ...userContext, updateProfile });
      update();
      componentSwitchEp();
    }
  };

  const update = () => {
    if (userContext) {
      const userReference = firestore.doc(`/users/${userContext.id}`);
      const userReferencePrivate = firestore.doc(
        `/privateData/${userContext.id}`
      );
      userReference.set(
        {
          shortBio: updateProfile.shortBio,
          longBio: updateProfile.longBio,
          username: updateProfile.username,
          country: updateProfile.country,
        },
        { merge: true }
      );
      userReferencePrivate.set(
        {
          username: updateProfile.username,
        },
        { merge: true }
      );
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                name="username"
                value={updateProfile.username}
                variant="outlined"
                fullWidth
                id="username"
                label={taken ? "Username is taken" : "Username"}
                autoFocus
                onChange={updateField}
                autoComplete="off"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="shortBio"
                value={updateProfile.shortBio}
                variant="outlined"
                fullWidth
                id="shortBio"
                label="Short bio"
                autoFocus
                onChange={updateField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="longBio"
                variant="outlined"
                value={updateProfile.longBio}
                fullWidth
                id="longBio"
                label="Long bio"
                multiline
                rows="2"
                autoFocus
                onChange={updateField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="country"
                variant="outlined"
                value={updateProfile.country}
                fullWidth
                id="country"
                label="Country"
                autoFocus
                onChange={updateField}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Profile Settings
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default EditProfileForm;
