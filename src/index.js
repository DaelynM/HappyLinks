import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import App from "./App";

//Context
import { UserContext } from "./Context/UserContext";

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
    <UserContext.Provider value={memoizeValue}>
      <App />
    </UserContext.Provider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ContextLevel />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
