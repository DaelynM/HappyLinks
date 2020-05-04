import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
//Components
import SignIn from "./Components/SignInComponent/SignIn";
import SignUp from "./Components/SignUpComponent/SignUp";
import Copyright from "./Components/CopyRightComponent/CopyRight";
import Header from "./Components/HeaderComponent/Header";

//Material-Ui
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Blue from "@material-ui/core/colors/blue";
import { Typography, Paper } from "@material-ui/core";

//firebase
import { auth } from "./Firebase/firebase";

//Styling
import "./App.scss";

const App = () => {
  const [themeState, setThemeState] = useState(false);

  const darkFunc = () => {
    const theme = createMuiTheme({
      palette: {
        type: "dark",
        primary: Blue,
      },
      status: {
        danger: "orange",
      },
      typography: {},
    });

    return theme;
  };

  const lightFunc = () => {
    const theme = createMuiTheme({
      palette: {
        type: "light",
      },
      status: {
        danger: "blue",
      },
      typography: {},
    });

    return theme;
  };

  const [signedIn, setSignedIn] = useState(null);

  useEffect(() => {
    const unsubsribeFromAuth = auth.onAuthStateChanged((e) => {
      setSignedIn(e);
      console.log(e);
    });

    return () => unsubsribeFromAuth();
  }, []);

  return (
    <ThemeProvider theme={themeState ? lightFunc() : darkFunc()}>
      <Paper>
        <div>
          <Header themeState={themeState} />
          <Typography variant="h1" className="test" align="center">
            Happy Links
          </Typography>
          <Route exact path="/" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Switch
            checked={themeState}
            onChange={() => setThemeState(!themeState)}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <Copyright />
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
