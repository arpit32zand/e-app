import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import homeBackground from "../images/2.jpg";
import { Redirect } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Forgot from "./Forgot";
import Copyright from "./Copyright";

export default class Login extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    let decider = "signin";
    this.state = {
      decider,
      loggedIn
    };
    this.handleInCall = this.handleInCall.bind(this);
    this.handleFormailCall = this.handleFormailCall.bind(this);
    this.handleUpCall = this.handleUpCall.bind(this);
  }

  handleInCall() {
    this.setState({ decider: "signup" });
  }

  handleUpCall() {
    this.setState({ decider: "signin" });
  }

  handleFormailCall() {
    this.setState({ decider: "forgot" });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/admin" />;
    }

    const classes = {
      root: {
        height: "100vh"
      },
      closeButton: {
        position: "absolute",
        right: "1em",
        top: "1em",
        color: "grey"
      },
      dialog: {
        translate: "none !important"
      },
      image: {
        backgroundImage: `url(${homeBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      paper: {
        margin: "8px 4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px"
      },
      avatarParent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px 0"
      },
      avatar: {
        margin: "1px",
        backgroundColor: "red"
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: "1px"
      },
      submit: {
        margin: "3px 0 2px"
      }
    };

    let formchoise;
    if (this.state.decider === "signin")
      formchoise = (
        <SignIn
          classes="classes"
          onHandleCall={this.handleInCall}
          onHandleFormail={this.handleFormailCall}
        />
      );
    else if (this.state.decider === "signup")
      formchoise = (
        <SignUp classes="classes" onHandleCall={this.handleUpCall} />
      );
    else formchoise = <Forgot classes="classes" />;

    return (
      <Grid container component="main" style={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} style={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div style={classes.avatarParent}>
            <Avatar style={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <div style={classes.paper}>{formchoise}</div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    );
  }
}
