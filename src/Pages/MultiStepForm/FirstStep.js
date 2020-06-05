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
  var isEmpty = username.length > 0;

  const [myUsernameCheck, setMyUsernameCheck] = useState("");

  const myUserName = async () => {
    var idk = firestore.doc(`/users/${userContext.id}`);
    const snapShot = await idk.get();
    //logs that snapshot here
    console.log("Snapshot here", snapShot.data().username);
    setMyUsernameCheck(snapShot.data().username);
    // return snapShot.data().username;
  };

  const [taken, setTaken] = useState(false); //false means it will work

  //does a check to see if the current
  if (userContext.username == username) {
    firestore
      .collection("users")
      .where("username", "==", username)
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        if (snapshot.empty) {
          console.log("not taken top");
          setTaken(false);
        } else {
          console.log("taken top");
          myUserName();
          console.log("nut", myUsernameCheck);
          console.log("username", username);
          myUsernameCheck === username ? setTaken(false) : setTaken(true);
        }
      });
  }

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
        <form onSubmit={handleNext}></form>
        <Button
          variant="contained"
          disabled={!isEmpty || isError || taken}
          color="primary"
          type="submit"
          // onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default FirstStep;
