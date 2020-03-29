import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class SignUp extends Component {
  constructor(props) {
    super(props);
    let isDialogOpen = false;
    this.state = {
      userDetails: "",
      username: " ",
      password: " ",
      email: " ",
      teacher: " ",
      student: " ",
      vcode: " ",
      vercode: " ",
      isDialogOpen
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleRadio(e) {
    this.props.onHandleRadio(e.target.value);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCode(e) {
    e.preventDefault();
    fetch("http://localhost:3001/user/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vcode: this.state.vcode,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        category: this.props.radiovalue
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.result === "Created") {
          alert("Account Created Successfully");
        } else {
          alert("Incorrect Verification Code");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCall(e) {
    this.props.onHandleCall(e.target.value);
  }

  handleClose = () => this.setState({ isDialogOpen: false });

  submitForm(e) {
    e.preventDefault();
    fetch("http://localhost:3001/user/add/", {
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
        if (data.result === "Send") {
          alert("A Verification Code Has Been Send To Your Email!");
          this.setState({ isDialogOpen: true });
        } else {
          alert(data.result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {this.state.isDialogOpen ? (
          <form
            style={this.props.classes.form}
            onSubmit={this.handleCode}
            noValidate
          >
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
              style={this.props.classes.submit}
              //onClick={this.handleCode}
            >
              Submit
            </Button>
          </form>
        ) : (
          <form
            style={this.props.classes.form}
            onSubmit={this.submitForm}
            noValidate
          >
            <RadioGroup
              aria-label="category"
              name="category"
              value={this.props.radiovalue}
              //onChange={this.handleChange}
            >
              <FormControlLabel
                value="teacher"
                control={<Radio />}
                label="teacher"
                onClick={this.handleRadio}
              />
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="student"
                onClick={this.handleRadio}
              />
            </RadioGroup>
            <TextField
              variant="outlined"
              margin="normal"
              required5
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
              style={this.props.classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  id="signup"
                  onClick={this.handleCall}
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
  }
}

export default SignUp;
