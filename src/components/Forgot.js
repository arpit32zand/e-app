import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import homeBackground from "../images/2.jpg";
import Copyright from "./Copyright";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
// import ForgotPass from "./ForgotPass";
//import ForgotPass from "./ForgotPass";

class Forgot extends Component {
  constructor(props) {
    super(props);
    let reDirect = false;
    let isDialogOpen = true;
    this.state = {
      email: "",
      newpass: "",
      confpass: "",
      isDialogOpen,
      reDirect
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handlePass = this.handlePass.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handlePass(e) {
    e.preventDefault();
    //this.setState({ email: JSON.parse(localStorage.getItem("email")) });
    fetch("http://localhost:3001/user/forgotpass/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("email")),
        newpass: this.state.newpass,
        confpass: this.state.confpass
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.result === "Success") {
          alert("Password Changed Successfully");
          this.setState({ isDialogOpen: false });
          //this.props.onHandleCall(e.target.value);
        } else {
          alert("Confirm Password Doesn't Match With New Password");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  submitForm(e) {
    e.preventDefault();
    localStorage.setItem("email", JSON.stringify(this.state.email));
    fetch("http://localhost:3001/user/forgotmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.result === "Exist") {
          alert("Please Check Your Email ID");
          this.setState({ reDirect: true });
        } else {
          alert("Account Doesn't Exist");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.reDirect) {
      return <Redirect to="/gmail" />;
    }
    if (!this.state.isDialogOpen) {
      return <Redirect to="/" />;
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
            <div>
              {this.props.match.params.handle === "password" ? (
                <div style={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Forgot Password
                  </Typography>
                  <form
                    style={classes.form}
                    onSubmit={this.handlePass}
                    noValidate
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="New Password"
                      id="newpass"
                      autoComplete="current-newpass"
                      autoFocus
                      type="password"
                      placeholder="Enter New Password"
                      name="newpass"
                      onChange={this.handleChange}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Confirm Password"
                      id="confpass"
                      autoComplete="current-confpass"
                      type="password"
                      placeholder="Re-Enter Password"
                      name="confpass"
                      onChange={this.handleChange}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={classes.submit}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              ) : (
                <div style={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Forgot Password
                  </Typography>
                  <form
                    style={classes.form}
                    onSubmit={this.submitForm}
                    noValidate
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      type="email"
                      placeholder="email"
                      name="email"
                      style={classes.form}
                      onChange={this.handleChange}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={classes.submit}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              )}
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Forgot;
