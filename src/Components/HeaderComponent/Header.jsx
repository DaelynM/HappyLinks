import React, { useContext } from "react";
import { auth } from "../../Firebase/firebase";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserContext } from "../../Context/UserContext";

const Header = ({ match, history, location }) => {
  const signedIn = useSelector((state) => state.user.currentUser);
  console.log("signedIn", signedIn);

  const { userContext } = useContext(UserContext);
  console.log("signedIn value", userContext);

  return (
    <div>
      {userContext ? (
        <div>
          <Link to="/">Home </Link>
          <Link to="/" onClick={() => auth.signOut()}>
            SignOut
          </Link>
          <Link to="/username"> Username</Link>
          <Link to="/form"> Form</Link>
          <Link to="/profile"> Profile</Link>
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>
          <Link to="/signin">SignIn</Link>
          <Link to="/signup">SignUp</Link>
          <Link to="/username">Username</Link>
        </div>
      )}
    </div>
  );
};

export default withRouter(Header);
