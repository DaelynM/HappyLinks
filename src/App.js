//React and Hooks
import React, { useEffect, useContext, useState, useMemo } from "react";
//Components
import Header from "./Components/HeaderComponent/Header";
import SignIn from "./Components/SignInComponent/SignIn";
import SignUp from "./Components/SignUpComponent/SignUp";
import ForgotPassword from "./Components/ForgotPasswordComponent/ForgotPassword";
//Pages
import UsernamePage from "./Pages/UsernamePage/UsernamePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Main from "./Pages/MultiStepForm/Main";
//Router
import { Route, Switch } from "react-router-dom";
//Firebase
import { auth, createProfileDoc, firestore } from "./Firebase/firebase";
//Material-Ui
import { Typography } from "@material-ui/core";
//Context
import { UserContext } from "./Context/UserContext";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import GeneralPage from "./Pages/GeneralPage/GeneralPage";
import HomePage from "./Pages/HomePage/HomePage";

const App = () => {
  //Context values
  const { userContext, setUserContext } = useContext(UserContext);

  useEffect(() => {
    const unsubsribeFromAuth = auth.onAuthStateChanged(async (userObj) => {
      // console.log("userObj", userObj);

      if (userObj != null) {
        const userReference = await createProfileDoc(userObj);

        //this allows me to see the snapshot at the current interval in time, and shows me the data for the user thats signed in: use console.log("S", snapShot.data()); to see all the data
        userReference.onSnapshot((snapShot) => {
          //console.log("S", snapShot.data());
          //console.log("SID", snapShot.id);
          //gets the id of the user, and assigns the data to it
          setUserContext({ id: snapShot.id, ...snapShot.data() });
        });
      } else {
        //pretty much just set the user back to null, as not signed in user is signed out
        console.log("userObjv2", userObj);
        setUserContext(userObj);
      }
    });

    return () => unsubsribeFromAuth();
  }, []);

  //TESTING SECTION
  // const userReference = firestore.doc(`/users/${userContext.id}`);
  // console.log("users userReference ", userReference);

  // const testing = async () => {
  //   const userReference = firestore.doc(`/users/${userContext.id}`);
  //   // //this is will give us the firebase snaphot object that tells if the user already exisits and their uid again
  //   const snapShot = await userReference.get();
  //   // //logs that snapshot here
  //   console.log("Snapshot userContext", snapShot);
  // };

  return (
    <div>
      <Header />
      {/*<Typography
        variant="h2"
        className="test"
        align="center"
        style={{ paddingBottom: "3%" }}
      >
        Happy Links
      </Typography>*/}

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Signin" component={SignIn} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/username" component={UsernamePage} />
        <Route path="/form" component={Main} />
        <Route path="/settings/:settingsPath" component={SettingsPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/:general" component={GeneralPage} />

        {/*<Route path="*" component={NotFoundPage} />*/}
      </Switch>
    </div>
  );
};

export default App;
