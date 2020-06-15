import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
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
      mobileno: " ",
      email: " ",
      vcode: " ",
      subject: " ",
      vercode: " ",
      isDialogOpen,
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
      [e.target.name]: e.target.value,
    });
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
        mobileno: this.state.mobileno,
        category: this.props.radiovalue,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.result === "Created") {
          alert("Account Created Successfully");
        } else if (data.result === "Incorrect") {
          alert("Incorrect Verification Code");
        } else {
          alert(data.result);
        }
      })
      .catch((err) => {
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
          this.setState({ isDialogOpen: true });
        } else {
          alert(data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const classes = {
      radi: {
        display: "inline-block",
        flexWrap: "wrap",
        flexDirection: "column",
      },
      submit: {
        width: "100%",
        maxWidth: "370px",
        marginLeft: "50px",
      },
      radi1: {
        marginRight: "120px",
        marginLeft: "65px",
      },
      formControl: {
        minWidth: 120,
      },
      links: {
        margin: "4px 0 4px 50px",
      },
      text: {
        width: "370px",
        //height: "50px",
        margin: "4px 0 4px 50px",
      },
      selec: {
        margin: "4px 0 4px 50px",
        minWidth: "370px",
      },
    };
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
              //fullWidth
              label="Verification Code"
              id="vcode"
              autoComplete="current-vcode"
              autoFocus
              type="text"
              placeholder="Enter Verification Code"
              name="vcode"
              style={classes.text}
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
              style={classes.radi}
              //onChange={this.handleChange}
            >
              <FormControlLabel
                value="mentor"
                control={<Radio />}
                label="Mentor"
                style={classes.radi1}
                onClick={this.handleRadio}
              />
              <FormControlLabel
                value="candidate"
                control={<Radio />}
                label="Candidate"
                onClick={this.handleRadio}
              />
            </RadioGroup>
            <TextField
              variant="outlined"
              margin="normal"
              required
              // fullWidth
              label="Username"
              id="username"
              autoComplete="current-username"
              autoFocus
              type="text"
              placeholder="username"
              name="username"
              style={classes.text}
              onChange={this.handleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              //fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              type="email"
              placeholder="email"
              name="email"
              style={classes.text}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              //fullWidth
              label="Password"
              id="password"
              autoComplete="current-password"
              type="password"
              placeholder="password"
              name="password"
              style={classes.text}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required5
              //fullWidth
              label="Mobile No."
              id="mobileno"
              autoComplete="mobile no."
              type="text"
              placeholder="mobile no."
              name="mobileno"
              style={classes.text}
              onChange={this.handleChange}
            />
            {/* {this.props.radiovalue === "candidate" ? (
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel style={classes.selec}>Subject</InputLabel>
                  <Select
                    style={classes.selec}
                    onChange={this.handleChange}
                    label="Subject"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>None 1</MenuItem>
                    <MenuItem value={2}>None 2</MenuItem>
                    <MenuItem value={3}>None 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ) : (
              console.log("Mentor")
            )} */}
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
                  value="signin"
                  onClick={this.handleCall}
                  style={classes.links}
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

/* <TextField
                variant="outlined"
                margin="normal"
                required5
                fullWidth
                label="Subject"
                id="subject"
                autoComplete="subject"
                type="text"
                placeholder="subject"
                onChange={this.handleChange}
              /> */
