import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
//Context
import { UserContext } from "./Context/UserContext";
//Material ui
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const ContextLevel = () => {
  const [userContext, setUserContext] = useState(
    "Using context!!! Lets goooo!"
  );
  //wont re-render the component unless the value of setValue is different :0
  const memoizeValue = useMemo(() => ({ userContext, setUserContext }), [
    userContext,
    setUserContext,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <UserContext.Provider value={memoizeValue}>
        <App />
      </UserContext.Provider>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <ContextLevel />
  </BrowserRouter>,
  document.getElementById("root")
);
