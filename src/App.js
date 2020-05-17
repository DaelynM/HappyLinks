//React and Hooks
import React, { useState, useEffect } from "react";
//Components
import SignIn from "./Components/SignInComponent/SignIn";
import SignUp from "./Components/SignUpComponent/SignUp";
import Copyright from "./Components/CopyRightComponent/CopyRight";
import Header from "./Components/HeaderComponent/Header";
//Pages
import UsernamePage from "./Pages/UsernamePage/UsernamePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
//Router
import { Route, Redirect } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Rirebase
import { auth, createProfileDoc } from "./Firebase/firebase";
//Material-Ui
import { Typography } from "@material-ui/core";
//Styling

import { firestore } from "./Firebase/firebase";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const unsubsribeFromAuth = auth.onAuthStateChanged(async (userObj) => {
      // console.log("userObj", userObj);

      if (userObj != null) {
        const userReference = await createProfileDoc(userObj);

        //this allows me to see the snapshot at the current interval in time, and shows me the data for the user thats signed in: use console.log("S", snapShot.data()); to see all the data
        userReference.onSnapshot((snapShot) => {
          console.log("S", snapShot.data());
          console.log("SID", snapShot.id);
          //gets the id of the user, and assigns the data to it
          dispatch({
            type: "CURRENT_USER_STATE",
            payload: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        //pretty much just set the user back to null, as not signed in user is signed out
        dispatch({
          type: "CURRENT_USER_STATE",
          payload: userObj,
        });
        console.log("userObjv2", userObj);
      }
    });

    return () => unsubsribeFromAuth();
  }, []);

  //TESTING SECTION
  // const test = firestore.collection("users").doc("OJEcQ19vm5Wsd3zZYkaU");
  // console.log("test", test);

  // const userReference = firestore.doc(`/users/${authParam.uid}`);
  // //this is will give us the firebase snaphot object that tells if the user already exisits and their uid again
  // const snapShot = await userReference.get();
  // //logs that snapshot here
  // console.log("Snapshot here", snapShot);

  const firstTimeSignin = () => {
    console.log("currentUser", currentUser);
    if (currentUser && currentUser.username == null) {
      return currentUser ? <Redirect to="/username" /> : <SignIn />;
    } else if (currentUser) {
      return <Redirect to="/ProfilePage" />;
    } else {
      return <SignIn />;
    }
  };

  return (
    <div>
      <Header />

      <Typography variant="h2" className="test" align="center">
        Happy Links
      </Typography>
      <Route exact path="/" component={firstTimeSignin} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Signin" component={firstTimeSignin} />
      <Route path="/username" component={UsernamePage} />
      <Copyright />
    </div>
  );
};

export default App;
