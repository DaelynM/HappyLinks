import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import { firestore } from "../../Firebase/firebase";

const PaymentForm = () => {
  const userState = useSelector((state) => state.user.currentUser);

  const updateField = async (e) => {
    if (userState) {
      const userReference = firestore.doc(`/users/${userState.id}`);
      userReference.update({ linkObj: e.target.value });
    }

    console.log(e.target.name + " " + e.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Links
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Link One"
            fullWidth
            value={userState ? userState.linkObj : ""}
            name="links"
            onChange={updateField}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
