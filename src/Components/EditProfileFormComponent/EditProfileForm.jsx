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
import { firestore } from "../../Firebase/firebase";

//firebase
import { createProfileDoc, auth } from "../../Firebase/firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditProfileForm = () => {
  const classes = useStyles();
  const { userContext, setUserContext } = useContext(UserContext);
  const [taken, setTaken] = useState(null);
  // var isEmpty = updateProfile.username.length > 0;

  console.log("dp", userContext);
  console.log("dp", userContext.lastName);

  //if it already exisit in the seshion then retreive it
  const [updateProfile, setUpdateProfile] = useState({
    shortBio: userContext.shortBio ? userContext.shortBio : "",
    longBio: userContext.longBio ? userContext.longBio : "",
    username: userContext.username ? userContext.username : "",
  });

  //gets the text from the field and updates state
  const updateField = (e) => {
    setUpdateProfile({
      ...updateProfile,
      [e.target.name]: e.target.value,
    });

    console.log(e.target.name + " " + e.target.value);
    console.log(e.target.name + " " + updateProfile.shortBio);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (taken === true || taken === null) {
      return;
    } else {
      setUserContext({ ...userContext, updateProfile });
      update();
    }
  };

  const update = () => {
    if (userContext) {
      const userReference = firestore.doc(`/users/${userContext.id}`);
      userReference.set(
        {
          shortBio: updateProfile.shortBio,
          longBio: updateProfile.longBio,
          username: updateProfile.username,
        },
        { merge: true }
      );
    }
  };

  useEffect(() => {
    firestore
      .collection("users")
      .where("username", "==", updateProfile.username)
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
            console.log("eu", updateProfile.username);

            if (e === updateProfile.username) {
              //if theryre both the same then theyre good
              setTaken(false);
            } else {
              setTaken(true);
            }
          });
        }
      });
  });

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
                label="Username"
                autoFocus
                onChange={updateField}
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={taken}
          >
            Save Profile Settings
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default EditProfileForm;
