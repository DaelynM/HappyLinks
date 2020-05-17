import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector } from "react-redux";
import { firestore } from "../../Firebase/firebase";

const AddressForm = () => {
  const userState = useSelector((state) => state.user.currentUser);

  const updateUsername = (e) => {
    if (userState) {
      const userReference = firestore.doc(`/users/${userState.id}`);
      userReference.update({ username: e.target.value });
    }

    console.log(e.target.name + " " + e.target.value);
  };

  const updateFirstName = (e) => {
    if (userState) {
      const userReference = firestore.doc(`/users/${userState.id}`);
      userReference.update({ firstName: e.target.value });
    }

    console.log(e.target.name + " " + e.target.value);
  };

  const updateLastName = (e) => {
    if (userState) {
      const userReference = firestore.doc(`/users/${userState.id}`);
      userReference.update({ firstName: e.target.value });
    }

    console.log(e.target.name + " " + e.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Generate Username
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            value={userState ? userState.firstName : ""}
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={updateFirstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            value={userState ? userState.lastName : ""}
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={updateLastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="username"
            value={userState ? userState.username : ""}
            label="Username"
            fullWidth
            onChange={updateUsername}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
