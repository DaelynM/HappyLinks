import React from "react";
import { auth } from "../../Firebase/firebase";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ match, history, location }) => {
  const signedIn = useSelector((state) => state.user.currentUser);
  console.log("signedIn", signedIn);

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
          <Link to="/username">Username</Link>
        </div>
      )}
    </div>
  );
};

export default withRouter(Header);
