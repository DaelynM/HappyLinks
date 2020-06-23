import React, { useState, useContext } from "react";
import { Grid, Hidden, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SimpleProfileCard from "../../Components/SimpleProfileCard/SimpleProfileCard";
import SimpleLinkCard from "../../Components/SimpleLinkCard/SimpleLinkCard";
import { UserContext } from "../../Context/UserContext";
import EditLinksComponent from "../../Components/EditLinksComponent/EditLinksComponent";
import EditProfileForm from "../../Components/EditProfileFormComponent/EditProfileForm";

const useStyles = makeStyles({});

function ProfilePage() {
  const classes = useStyles();

  const [link, setLink] = useState("https://www.insta.com");

  const { userContext, setUserContext } = useContext(UserContext);
  // console.log("signedIn value id", userContext.username);

  const [linkComponent, setLinkComponent] = useState(true);

  const componentSwitch = () => {
    setLinkComponent(!linkComponent);
  };

  const [editProfile, setEditProfile] = useState(false);

  const componentSwitchEp = () => {
    setEditProfile(!editProfile);
  };

  if (userContext.linkArray) {
    console.log("userContext", userContext);
    console.log("userContext.links", userContext.linkArray[0]);
  }

  return (
    <div style={{ maxWidth: "99.2%" }}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={11} sm={3}>
          <SimpleProfileCard
            firebaseCall={userContext}
            componentSwitchEp={componentSwitchEp}
          />
        </Grid>

        <Grid item xs={11} sm={7}>
          {editProfile ? <EditProfileForm /> : null}

          {linkComponent ? (
            userContext.linkArray ? (
              userContext.linkArray.map((e) => {
                return (
                  <div key={e.id}>
                    <SimpleLinkCard link={e.url} shake={e.shake} />
                    <br />
                  </div>
                );
              })
            ) : (
              ""
            )
          ) : (
            <EditLinksComponent
              editLinks={userContext.linkArray}
              componentSwitch={componentSwitch}
            />
          )}

          {linkComponent ? (
            userContext.linkArray ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 20 }}
                  onClick={componentSwitch}
                >
                  Add / Edit Linksss
                </Button>
              </div>
            ) : null
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
