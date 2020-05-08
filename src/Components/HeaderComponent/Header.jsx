import React from "react";
import { auth } from "../../Firebase/firebase";
import { withRouter, Link } from "react-router-dom";

const Header = ({ signedIn, match, history, location }) => {
  return (
    <div>
      {signedIn ? (
        <Link to="/" onClick={() => auth.signOut()}>
          SignOut
        </Link>
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
