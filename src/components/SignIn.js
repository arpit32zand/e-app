import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    let catdecide = "teacher";
    this.state = {
      email: " ",
      password: " ",
      catdecide,
      loggedIn
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.handleformail = this.handleformail.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleformail(e) {
    this.props.onHandleFormail(e.target.value);
  }

  handleCall(e) {
    this.props.onHandleCall(e.target.value);
  }

  submitForm(e) {
    e.preventDefault();

    fetch("http://localhost:3001/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        return res.json();
      })

      .then(data => {
        if (data.result === "TLogged") {
          this.setState({ loggedIn: true, catdecide: "teacher" });
        } else if (data.result === "SLogged") {
          this.setState({ loggedIn: true, catdecide: "student" });
        } else alert(data.result);
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.loggedIn) {
      if (this.state.catdecide === "teacher") return <Redirect to="/teacher" />;
      else return <Redirect to="/student" />;
    }
    return (
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          style={this.props.classes.form}
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
            style={this.props.classes.submit}
            //onClick={this.submitForm}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                value="forgot"
                onClick={this.handleformail}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                value="signup"
                onClick={this.handleCall}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default SignIn;
