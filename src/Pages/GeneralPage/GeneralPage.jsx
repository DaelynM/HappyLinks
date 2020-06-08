import React, { useState, useContext, useEffect } from "react";
import { Grid, Hidden, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SimpleProfileCard from "../../Components/SimpleProfileCard/SimpleProfileCard";
import SimpleLinkCard from "../../Components/SimpleLinkCard/SimpleLinkCard";
import { UserContext } from "../../Context/UserContext";
import firebase, { firestore } from "../../Firebase/firebase";

function GeneralPage({ match }) {
  const [generalUser, setGeneralUser] = useState();

  useEffect(() => {
    firestore
      .collection("users")
      .where("username", "==", match.params.general)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          setGeneralUser({ id: doc.id, data: doc.data() });
        });
      });
  }, []);

  return (
    <div style={{ maxWidth: "99.2%" }}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={11} sm={3}>
          <p>Side Bar 1 </p>
          <p>{generalUser ? generalUser.id : null}</p>
          <p>{generalUser ? generalUser.data.username : null}</p>
          <p>{generalUser ? generalUser.data.founderAward : null}</p>
        </Grid>

        <Grid item xs={11} sm={7}>
          <p>Links</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default GeneralPage;
