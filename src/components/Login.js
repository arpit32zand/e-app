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
// import ForgotPass from "./ForgotPass";
//import { Redirect } from "react-router-dom";
import Copyright from "./Copyright";

export default class Login extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    let radiovalue = "mentor";
    let decider = "signin";
    this.state = {
      decider,
      loggedIn,
      radiovalue
    };
    this.handleInCall = this.handleInCall.bind(this);
    this.handleFormailCall = this.handleFormailCall.bind(this);
    this.handleUpCall = this.handleUpCall.bind(this);
    this.handleUpRadio = this.handleUpRadio.bind(this);
  }

  handleUpRadio(valu) {
    this.setState({ radiovalue: valu });
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
      radi: {
        display: "inline-block",
        flexWrap: "wrap",
        flexDirection: "column"
      },
      //   radi1: {
      //     cursor: pointer,
      // display: "inline-flex",
      // alignItems: "center",
      // marginLeft: "-11px",
      // marginRight: "16px",
      // verticalAlign: "middle",
      //   },
      image: {
        backgroundImage: `url(${homeBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      // inpu: {
      //   width: "100%",
      //   min-width: "500px"
      // },
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
        //minWidth: "500px",
        marginTop: "1px"
      },
      form1: {
        font: "inherit",
        color: "currentColor",
        width: "100%",
        border: "0",
        height: "1.1875em",
        display: "block",
        //padding: 6px 0 7px,
        minWidth: "500px",
        background: "none",
        boxSizing: "content-box"
      },
      submit: {
        width: "100%",
        minWidth: "500px",
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
        <SignUp
          classes="classes"
          radiovalue={this.state.radiovalue}
          onHandleRadio={this.handleUpRadio}
          onHandleCall={this.handleUpCall}
        />
      );
    else
      formchoise = (
        //<ForgotPass />

        <Redirect to="/forgot/false" />
      );

    return (
      <div style={classes.root}>
        <Grid container component="main" style={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} style={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
      </div>
    );
  }
}
