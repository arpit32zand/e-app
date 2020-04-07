import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
//import ForgotPass from "./components/ForgotPass";
import Forgot from "./components/Forgot";

//import Test from "./components/Test";

class App extends Component {
  constructor(props) {
    super(props);
    let openPass = true;
    this.state = {
      openPass,
    };
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/teacher/" exact component={Teacher} />
        <Route
          path="/gmail"
          component={() => {
            window.location.href = "https://mail.google.com/";
            return null;
          }}
        />
        <Route path="/forgot/:handle" exact component={Forgot} />
        <Route path="/student" exact component={Student} />
      </Switch>
    );
  }
}

export default App;

//<Route path="/admin" exact Component={Admin} />
