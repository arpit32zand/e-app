import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "react-dialog";

class Forgot extends Component {
  constructor(props) {
    super(props);
    let isDialogOpen = false;
    this.state = {
      password: "",
      email: "",
      newpass: "",
      confpass: "",
      isDialogOpen
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
    fetch("http://localhost:3001/user/forgotpass/", {
      method: "POST",
      credentials: "same-origin/include",
      /*mode: "cors",
      cache: "no-cache",*/
      //credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //Cache: "no-cache"
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

  submitForm(e) {
    e.preventDefault();

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
        alert(data.result);
        this.setState({ isDialogOpen: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
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
  }
}

export default Forgot;
