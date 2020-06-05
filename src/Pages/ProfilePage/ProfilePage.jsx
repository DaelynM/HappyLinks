import React, { useState, useContext } from "react";
import { Grid, Hidden, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SimpleProfileCard from "../../Components/SimpleProfileCard/SimpleProfileCard";
import SimpleLinkCard from "../../Components/SimpleLinkCard/SimpleLinkCard";
import { UserContext } from "../../Context/UserContext";

const useStyles = makeStyles({});

function ProfilePage() {
  const classes = useStyles();

  const [link, setLink] = useState("https://www.insta.com");

  const { userContext, setUserContext } = useContext(UserContext);
  // console.log("signedIn value id", userContext.username);

  if (userContext.linkArray) {
    console.log("userContext", userContext);
    console.log("userContext.links", userContext.linkArray[0]);
  }

  return (
    <div style={{ maxWidth: "99.2%" }}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={11} sm={3}>
          <SimpleProfileCard />
        </Grid>

        <Grid item xs={11} sm={7}>
          {userContext.linkArray
            ? userContext.linkArray.map((e) => {
                return (
                  <div key={e.id}>
                    <SimpleLinkCard link={e.url} />
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

export default ProfilePage;
