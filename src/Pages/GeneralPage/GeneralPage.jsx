import React, { useState, useContext, useEffect } from "react";
import { Grid, Hidden, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SimpleProfileCard from "../../Components/SimpleProfileCard/SimpleProfileCard";
import SimpleLinkCard from "../../Components/SimpleLinkCard/SimpleLinkCard";
import { UserContext } from "../../Context/UserContext";
import firebase, { firestore } from "../../Firebase/firebase";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  center: {
    textAlign: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fixSelectionBox: {
    textAlign: "center",
  },
}));

function GeneralPage({ match }) {
  const classes = useStyles();

  const { userContext, setUserContext } = useContext(UserContext);

  const [generalUser, setGeneralUser] = useState();
  var makePrivate = true;

  useEffect(() => {
    firestore
      .collection("users")
      .where("username", "==", match.params.general)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          setGeneralUser({
            id: doc.id,
            data: doc.data(),
          });
        });
      });
  }, []);

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      {/*<p>{generalUser ? generalUser.id : null}</p>
      <p>{generalUser ? generalUser.data.signUpIp : null}</p>
      <p>{generalUser ? generalUser.data.username : null}</p>
      <p>{generalUser ? generalUser.data.founderAward : null}</p>
  <p>{generalUser ? generalUser.data.profilePic : null}</p>*/}
      <Grid container spacing={3} justify="center">
        <Grid item xs={11} sm={3}>
          {generalUser ? (
            <SimpleProfileCard
              makePrivate={makePrivate}
              firebaseCall={generalUser.data}
            />
          ) : null}
        </Grid>

        <Grid item xs={11} sm={7}>
          {generalUser
            ? generalUser.data.linkArray.map((e) => {
                return (
                  <div key={e.id}>
                    <SimpleLinkCard link={e.url} effect={e.effect} />
                    <br />
                  </div>
                );
              })
            : ""}
        </Grid>
      </Grid>
    </div>
  );
}

export default GeneralPage;
