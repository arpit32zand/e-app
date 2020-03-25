import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import Login from "./components/Login";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  //<Login />,
  document.getElementById("root")
);
