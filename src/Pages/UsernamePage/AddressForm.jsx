import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { UserContext } from "../../Context/UserContext";
import { FormContext } from "../../Context/FormContext";
import { firestore } from "../../Firebase/firebase";

const AddressForm = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  console.log("signedIn value id", userContext.username);

  const { formContext, setFormContext } = useContext(FormContext);
  console.log("fromContext address", formContext);

  const updateUsername = (e) => {
    // if (userContext) {
    //   const userReference = firestore.doc(`/users/${userContext.id}`);
    //   userReference.update({ username: e.target.value });
    // }

    setUserContext({ ...userContext, username: e.target.value });
  };

  const updateFirstName = (e) => {
    // if (userContext) {
    //   const userReference = firestore.doc(`/users/${userContext.id}`);
    //   userReference.update({ firstName: e.target.value });
    // }

    setUserContext({ ...userContext, firstName: e.target.value });
  };

  const updateLastName = (e) => {
    // if (userContext) {
    //   const userReference = firestore.doc(`/users/${userContext.id}`);
    //   userReference.update({ lastName: e.target.value });
    // }
    setUserContext({ ...userContext, lastName: e.target.value });
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
            value={userContext.firstName || ""}
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
            value={userContext.lastName || ""}
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
            value={userContext.username || ""}
            label="Username"
            fullWidth
            onChange={updateUsername}
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="overline" display="block" gutterBottom>
            https://happylinks.com/{userContext.username}
          </Typography>
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
