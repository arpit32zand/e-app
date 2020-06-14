import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 900,
  },
  formDiv: {
    width: "80%",
    margin: "0 auto",
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  formControl: {
    margin: "10px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});
const types = [
  {
    value: "Pdf",
    label: "PDF",
  },
  {
    value: "Text",
    label: "TEXT",
  },
];

class AddCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      activeStep: 0,
      courseName: null,
      discountPrice: null,
      actualPrice: null,
      fileType: null,
      visible: false,
      textContent: null,
      path: null,
      imagePath: null,
      redirect: false,
    };
    this.getSteps = this.getSteps.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu() {
    this.setState({ visible: !this.state.visible });
  }

  handleClose() {
    this.setState({ visible: !this.state.visible });
  }

  uploadImage(e) {
    this.setState({ imagePath: URL.createObjectURL(e.target.files[0]) });
  }

  getSteps() {
    return ["Step 1", "Step 2", "Step 3"];
  }

  getStepContent(stepIndex, classes, name) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <TextField
              id="standard-name"
              label="Course Name"
              className={classes.textField}
              name="courseName"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <br />
            <input type="file" onChange={(e) => this.uploadImage(e)} />
          </div>
        );
      case 1:
        return (
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-number"
              label="Actual Price"
              name="actualPrice"
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              id="standard-number"
              label="Discount Price"
              name="discountPrice"
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </form>
        );
      case 2:
        return (
          <div>
            <TextField
              id="standard-select"
              select
              label="File Type"
              className={classes.textField}
              name="fileType"
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select Your File Type"
              margin="normal"
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {this.state.fileType === "Text" ? (
              <TextField
                id="standard-multiline-static"
                label="Content"
                multiline
                rows="12"
                name="textContent"
                placeholder="Type Over Here"
                className={classes.textArea}
                margin="normal"
                onChange={this.handleChange}
              />
            ) : this.state.fileType === "Pdf" ? (
              <div>
                <br />
                <input type="file" />
              </div>
            ) : (
              console.log("NULL")
            )}
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm(email) {
    // e.preventDefault();
    fetch("http://localhost:3001/user/add-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        courseName: this.state.courseName,
        path: this.state.path,
        actualPrice: this.state.actualPrice,
        discountPrice: this.state.discountPrice,
        fileType: this.state.fileType,
        textContent: this.state.textContent,
        imagePath: this.state.imagePath,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.result === "Created") {
          this.handleReset();
          alert("Course Added Successfully");
          // this.setState(state => ({
          //   activeStep: state.activeStep + 1,
          // }));
        } else {
          alert(data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // alert("Submitted");
  }

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset() {
    this.setState({
      activeStep: 0,
    });
  }

  render() {
    // if (redirect === true) {<Redirect to="/mentor" />}
    const mentorData = localStorage.getItem("mentorData");
    let data = JSON.parse(mentorData);

    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
               </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Add Course
              </Typography>
              {JSON.parse(localStorage.getItem("type")) === "mentor" ? (
                <div>
                  <IconButton
                    style={{
                      position: "absolute",
                      right: "25px",
                      top: "25px",
                      padding: "0",
                    }}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    style={{ right: "25px", top: "55px", padding: "0" }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={this.state.visible}
                    onClose={this.handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        this.setState({
                          visible: !this.state.visible,
                          redirect: !this.state.redirect,
                        });
                      }}
                    >
                      Home
                    </MenuItem>
                  </Menu>
                </div>
              ) : JSON.parse(localStorage.getItem("type")) === "candidate" ? (
                <div>{/* <Redirect to="/mentor" />; */}</div>
              ) : (
                <div>{/* <Redirect to="/" />; */}</div>
              )}
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.formDiv}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  Course Added Successfully!
                </Typography>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {this.getStepContent(activeStep, classes)}
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.submitForm(data.email);
                      }}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

AddCourses.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AddCourses);
