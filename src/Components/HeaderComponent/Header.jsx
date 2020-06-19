import React, { useContext } from "react";
import { auth } from "../../Firebase/firebase";
import { withRouter, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  pad: {
    paddingBottom: 12,
  },
});

const Header = ({ match, history, location }) => {
  const { userContext } = useContext(UserContext);
  console.log("signedIn value", userContext);
  const classes = useStyles();

  return (
    <div className={classes.pad}>
      {userContext ? (
        <div>
          <Link to="/">Home </Link>
          <Link to="/" onClick={() => auth.signOut()}>
            SignOut
          </Link>
          <Link to="/form"> Form</Link>
          <Link to="/profile"> Profile</Link>
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>
          <Link to="/signin">SignIn</Link>
          <Link to="/signup">SignUp</Link>
        </div>
      )}
    </div>
  );
};

export default withRouter(Header);
