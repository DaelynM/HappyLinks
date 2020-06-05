import React, { Fragment, useContext, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../Context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { firestore } from "../../Firebase/firebase";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const idShoterner = (e) => {
  var newId = e.slice(0, 10);
  newId = newId.concat("...");
  return newId;
};

// Destructure props
const Confirm = ({ handleNext, handleBack, values: { username } }) => {
  const { userContext, setUserContext } = useContext(UserContext);

  const classes = useStyles();

  const updateUsername = () => {
    if (userContext) {
      const userReference = firestore.doc(`/users/${userContext.id}`);
      userReference.update({
        username: userContext.username,
        linkArray: userContext.linkArray,
      });
    }
    handleNext();
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    //check if the username is ok

    console.log("taken here", taken);

    if (taken === true) {
      return;
    }

    //submit
    updateUsername();
  };

  return (
    <Fragment>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Username" secondary={userContext.username} />
          <Typography variant="body2">{userContext.username}</Typography>
        </ListItem>
        {userContext.linkArray.map((e) => (
          <ListItem className={classes.listItem} key={e.id}>
            <ListItemText
              primary={`Link ${e.url}`}
              secondary={idShoterner(e.id)}
            />
            <Typography variant="body2">{e.url}</Typography>
          </ListItem>
        ))}

        <Divider />
      </List>

      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <form onSubmit={handleSubmit}>
          <Button
            style={{ marginLeft: 20 }}
            variant="contained"
            color="secondary"
            type="submit"

            //onClick={updateUsername}
          >
            Confirm & Continue
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default Confirm;
