import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "react-dialog";
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
    this.handleCodeCopy = this.handleCodeCopy.bind(this);
    this.submitFormCopy = this.submitFormCopy.bind(this);
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
      //mode: "cors",
      //credentials: "include",
      headers: {
        //Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vcode: this.state.vcode
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.result === "Created") {
          alert("Account Created Successfully");
          //this.setState({ isDialogOpen: false });
          //this.props.onHandleCall(e.target.value);
        } else {
          alert("Incorrect Verification Code");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCodeCopy(e) {
    e.preventDefault();
    fetch("http://localhost:3001/user/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vcode: this.state.vcode,
        vercode: this.state.vercode,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.result === "Created") {
          alert("Account Created Successfully");
          this.setState({ isDialogOpen: false });
          //this.props.onHandleCall(e.target.value);
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
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        console.log("res*********", res.headers);
        return res.json();
      })
      .then(data => {
        if (data.result === "Send") {
          //alert("A Verification Code Has Been Send To Your Email!");
          //this.setState({ isDialogOpen: true, userDetails:  data.});
          console.log("data*********", JSON.parse(data.details));
        } else {
          alert(data.result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  submitFormCopy(e) {
    e.preventDefault();
    this.setState({ vercode: Math.floor(Math.random() * 1000000) + "" });
    fetch("http://localhost:3001/user/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        vcode: this.state.vcode
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
          <Dialog
            modal={true}
            onClose={this.handleClose}
            style={this.props.classes.dialog}
            /*buttons={[
              {
                text: "Submit",

                variant: "contained",
                color: "primary",
                style: { margin: "3px 0 2px" },
                onClick: () => this.handleCode
              }
            ]}*/
          >
            <form
              style={this.props.classes.form}
              onSubmit={this.handleCodeCopy}
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
          </Dialog>
        ) : (
          <form
            style={this.props.classes.form}
            onSubmit={this.submitFormCopy}
            noValidate
          >
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value="teacher"
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="teacher"
                control={<Radio />}
                label="teacher"
              />
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="student"
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

/*submitFormCopy(e) {
  e.preventDefault();
  this.setState({ vcode: Math.floor(Math.random() * 1000000) + "" });
  fetch("http://localhost:3001/user/add/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      vcode: this.state.vcode
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
}*/

/*handleCodeCopy(e) {
  e.preventDefault();
  fetch("http://localhost:3001/user/verify/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vcode: this.state.vcode
    })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.result === "Created") {
        alert("Account Created Successfully");
        this.setState({ isDialogOpen: false });
        //this.props.onHandleCall(e.target.value);
      } else {
        alert("Incorrect Verification Code");
      }
    })
    .catch(err => {
      console.log(err);
    });
}*/
