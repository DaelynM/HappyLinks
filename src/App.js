//React and Hooks
import React, { useEffect, useContext, useState, useMemo } from "react";
//Components
import SignIn from "./Components/SignInComponent/SignIn";
import SignUp from "./Components/SignUpComponent/SignUp";
// import Copyright from "./Components/CopyRightComponent/CopyRight";
import Header from "./Components/HeaderComponent/Header";
//Pages
import UsernamePage from "./Pages/UsernamePage/UsernamePage";
//Router
import { Route } from "react-router-dom";
//Firebase
import { auth, createProfileDoc } from "./Firebase/firebase";
//Material-Ui
import { Typography } from "@material-ui/core";
//Styling

// import { firestore } from "./Firebase/firebase";

import { UserContext } from "./Context/UserContext";
import { FormContext } from "./Context/FormContext";

const App = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  console.log("Contex value", userContext);

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
  // const test = firestore.collection("users").doc("OJEcQ19vm5Wsd3zZYkaU");
  // console.log("test", test);

  // const userReference = firestore.doc(`/users/${authParam.uid}`);
  // //this is will give us the firebase snaphot object that tells if the user already exisits and their uid again
  // const snapShot = await userReference.get();
  // //logs that snapshot here
  // console.log("Snapshot here", snapShot);

  const [formContext, setFormContext] = useState("hello");
  const memoizeValue = useMemo(() => ({ formContext, setFormContext }), [
    formContext,
    setFormContext,
  ]);

  return (
    <div>
      <Header />
      <Typography variant="h2" className="test" align="center">
        Happy Links
      </Typography>
      <Route exact path="/" component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Signin" component={SignIn} />
      <FormContext.Provider value={memoizeValue}>
        <Route path="/username" component={UsernamePage} />
      </FormContext.Provider>

      {/*<Copyright/>*/}
    </div>
  );
};

export default App;
