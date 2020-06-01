import React, { Fragment, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { firestore } from "../../Firebase/firebase";
import { UserContext } from "../../Context/UserContext";

const Success = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  console.log("signedIn value id", userContext.username);

  const updateUsername = () => {
    if (userContext) {
      const userReference = firestore.doc(`/users/${userContext.id}`);
      userReference.update({
        username: userContext.username,
        linkArray: userContext.linkArray,
      });
    }
  };

  return (
    <Fragment>
      <Typography variant="h2" align="center">
        Thank you!
      </Typography>
      <Typography component="p" align="center" style={{ marginTop: 40 }}>
        You will get an email with further instructions
      </Typography>
      <button onClick={updateUsername()}>Submit to firebase</button>
    </Fragment>
  );
};

export default Success;
