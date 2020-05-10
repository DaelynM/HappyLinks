import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
//Components
import SignIn from "./Components/SignInComponent/SignIn";
import SignUp from "./Components/SignUpComponent/SignUp";
import Copyright from "./Components/CopyRightComponent/CopyRight";
import Header from "./Components/HeaderComponent/Header";

//Material-Ui
import { Typography } from "@material-ui/core";

//firebase
import { auth, firestore } from "./Firebase/firebase";
import { createProfileDoc } from "./Firebase/firebase";

//Styling
import "./App.scss";

const App = () => {
  const [signedIn, setSignedIn] = useState(null); //when i sign out / am signed out its null

  useEffect(() => {
    const unsubsribeFromAuth = auth.onAuthStateChanged(async (userObj) => {
      console.log("userObj", userObj);

      if (userObj != null) {
        const userReference = await createProfileDoc(userObj);

        //this allows me to see the snapshot at the current interval in time, and shows me the data for the user thats signed in: use console.log("S", snapShot.data()); to see all the data
        userReference.onSnapshot((snapShot) => {
          console.log("S", snapShot.data());
          //gets the id of the user, and assigns the data to it
          setSignedIn({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        //pretty much just set the user back to null, as not signed in
        setSignedIn(userObj);
        console.log("userObjv2", userObj);
      }
    });

    return () => unsubsribeFromAuth();
  }, []);

  useEffect(() => {
    console.log("cu", signedIn);
  }, [signedIn]);

  //TESTING SECTION

  const test = firestore.collection("users").doc("OJEcQ19vm5Wsd3zZYkaU");
  console.log("test", test);

  //

  return (
    <div>
      <Header signedIn={signedIn} />
      <Typography variant="h2" className="test" align="center">
        Happy Links
      </Typography>
      <Route exact path="/" component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Copyright />
    </div>
  );
};

export default App;
