import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import homeBackground from "../images/2.jpg";
import { Redirect } from "react-router-dom";
import Copyright from "./Copyright";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "react-dialog";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default class Login extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    let decider = "signin";
    let isFoDialogOpen = false;
    let isUpDialogOpen = false;
    this.state = {
      decider,
      email: " ",
      password: " ",
      newpass: "",
      confpass: "",
      loggedIn,
      userDetails: "",
      username: " ",
      vcode: " ",
      vercode: " ",
      isUpDialogOpen,
      isFoDialogOpen,
    };
    this.handleInCall = this.handleInCall.bind(this);
    this.handleFormail = this.handleFormail.bind(this);
    this.handleUpCall = this.handleUpCall.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitUpForm = this.submitInForm.bind(this);
    this.submitUpForm = this.submitUpForm.bind(this);
    this.submitFoForm = this.submitFoForm.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handlePass = this.handlePass.bind(this);
  }

  handleInCall() {
    this.setState({ decider: "signup" });
  }

  handleUpCall() {
    this.setState({ decider: "signin" });
  }

  handleFormail() {
    this.setState({ decider: "forgot" });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCode(e) {
    e.preventDefault();
    fetch("http://localhost:3001/user/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vcode: this.state.vcode,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.result === "Created") {
          alert("Account Created Successfully");
          this.setState({ isUpDialogOpen: false });
        } else {
          alert("Incorrect Verification Code");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitInForm(e) {
    e.preventDefault();

    fetch("http://localhost:3001/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        if (data.result === "Logged") {
          this.setState({ loggedIn: true });
        } else alert(data.result);
      })
      .catch((err) => console.log(err));
  }

  handlePass(e) {
    e.preventDefault();
    fetch("http://localhost:3001/user/forgotpass/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        newpass: this.state.newpass,
        confpass: this.state.confpass,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.result === "Success") {
          alert("Password Changed Successfully");
          this.setState({ isFoDialogOpen: false });
          //this.props.onHandleCall(e.target.value);
        } else {
          alert("Confirm Password Doesn't Match With New Password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitFoForm(e) {
    e.preventDefault();

    fetch("http://localhost:3001/user/forgotmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.result === "Exist") {
          alert("Please Check Your Email ID");
          this.setState({ isFoDialogOpen: true, reDirect: true });
        } else {
          alert("Account Doesn't Exist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClose = () => this.setState({ isUpDialogOpen: false });

  submitUpForm(e) {
    e.preventDefault();
    fetch("http://localhost:3001/user/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.result === "Send") {
          alert("A Verification Code Has Been Send To Your Email!");
          this.setState({ isUpDialogOpen: true });
        } else {
          alert(data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/admin" />;
    }

    const classes = {
      root: {
        height: "100vh",
      },
      closeButton: {
        position: "absolute",
        right: "1em",
        top: "1em",
        color: "grey",
      },
      dialog: {
        translate: "none !important",
      },
      image: {
        backgroundImage: `url(${homeBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      paper: {
        margin: "8px 4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      },
      avatarParent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px 0",
      },
      avatar: {
        margin: "1px",
        backgroundColor: "red",
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        minWidth: "500px",
        marginTop: "1px",
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
        boxSizing: "content-box",
      },
      submit: {
        width: "100%",
        minWidth: "500px",
        margin: "3px 0 2px",
      },
    };

    let formchoise;
    if (this.state.decider === "signin") {
      formchoise = (
        <div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form style={classes.form} onSubmit={this.submitInForm} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              type="text"
              placeholder="email"
              name="email"
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              id="password"
              autoComplete="current-password"
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={classes.submit}
              //onClick={this.submitForm}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  value="forgot"
                  onClick={this.handleFormail}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  value="signup"
                  onClick={this.handleUpCall}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    } else if (this.state.decider === "signup")
      formchoise = (
        <div>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {this.state.isUpDialogOpen ? (
            <Dialog
              modal={true}
              onClose={this.handleClose}
              style={classes.dialog}
            >
              <form style={classes.form} onSubmit={this.handleCode} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Verification Code"
                  id="vcode"
                  autoComplete="current-vcode"
                  autoFocus
                  type="text"
                  placeholder="Enter Verification Code"
                  name="vcode"
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={classes.submit}
                  //onClick={this.handleCode}
                >
                  Submit
                </Button>
              </form>
            </Dialog>
          ) : (
            <form style={classes.form} onSubmit={this.submitUpForm} noValidate>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value="mentor"
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="mentor"
                  control={<Radio />}
                  label="mentor"
                />
                <FormControlLabel
                  value="candidate"
                  control={<Radio />}
                  label="candidate"
                />
              </RadioGroup>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                id="username"
                autoComplete="current-username"
                autoFocus
                type="text"
                placeholder="username"
                name="username"
                onChange={this.handleChange}
              />

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
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                id="password"
                autoComplete="current-password"
                type="password"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={classes.submit}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    id="signup"
                    onClick={this.handleUpCall}
                    variant="body2"
                  >
                    {"Already Have an Account! Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </div>
      );
    else
      formchoise = (
        <div>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          {this.state.isFoDialogOpen ? (
            <Dialog
              modal={true}
              onClose={this.handleClose}
              style={classes.dialog}
            >
              <form style={classes.form} onSubmit={this.handlePass} noValidate>
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
                  autoFocus
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
            </Dialog>
          ) : (
            <form style={classes.form} onSubmit={this.submitFoForm} noValidate>
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
                style={this.props.classes.form1}
                onChange={this.handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={this.props.classes.submit}
              >
                Submit
              </Button>
            </form>
          )}
        </div>
      );

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
