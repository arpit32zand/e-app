import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
//import Test from "./components/Test";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/admin" exact component={Admin} />
      </Switch>
    );
  }
}

export default App;

//<Route path="/admin" exact Component={Admin} />
