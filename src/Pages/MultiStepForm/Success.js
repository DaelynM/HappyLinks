import React, { Fragment, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { firestore } from "../../Firebase/firebase";
import { UserContext } from "../../Context/UserContext";
import LoaderComponent from "../../Components/LoaderComponent/LoaderComponent";

const Success = () => {
  return (
    <Fragment>
      <Typography variant="h2" align="center">
        Thank you!
      </Typography>
      <Typography component="p" align="center" style={{ marginTop: 40 }}>
        You will be redirected to your private profile in a few momments
        <LoaderComponent whereTo="/profile" time="700" />
      </Typography>
    </Fragment>
  );
};

export default Success;
