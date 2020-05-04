import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//Material-Ui

import App from "./App";

import "./index.scss";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
