import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameChange: false,
      mobChange: false,
      oldChange: false,
      newChange: false,
      auth: true,
      editProf: false,
      myCourProf: false,
      visible: false,
      username: null,
      email: null,
      uid: null,
      cid: null,
      mobileno: null,
      oldPass: null,
      newPass: null,
      courseId: null,
      courseName: null,
      path: null,
      fileType: null,
      confPass: null,
      conte: false,
      subname: null,
      coursecontent: null,
    };
    this.handleOut = this.handleOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    // this.handleClick=
    // this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMobChange = this.handleMobChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOldPass = this.handleOldPass.bind(this);
    this.handleNewPass = this.handleNewPass.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleMyCourse = this.handleMyCourse.bind(this);
  }

  handleMyCourse(content, name) {
    this.setState({ conte: true, coursecontent: content, subname: name });
  }

  handleMobChange() {
    fetch("http://localhost:3001/user/update-m-c", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        uid: this.state.uid,
        mobileno: this.state.mobileno,
      }),
    })
      .then((res) => {
        return res.json();
      })

      .then((ress) => {
        if (ress.result === "DONE") {
          this.setState({ mobChange: false });
          alert("Mobile No Changed");
        } else {
          alert(ress.result);
        }
      })
      .catch((err) => console.log(err));
  }

  async handlePurchase(row, cid) {
    await fetch("http://localhost:3001/user/purchase", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseName: row.courseName,
        courseId: row.courseId,
        path: row.path,
        fileType: row.fileType,
        cid: cid,
        textContent: row.textContent,
        imagePath: row.imagePath,
      }),
    })
      .then((res) => {
        return res.json();
      })

      .then((ress) => {
        if (ress.result === "DONE") {
          alert("Purchase Successful");
        } else {
          alert(ress.result);
        }
      })
      .catch((err) => console.log(err));

    await fetch("http://localhost:3001/candidates/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.map((key) =>
          key.email === this.state.email
            ? localStorage.setItem("candidateData", JSON.stringify(key))
            : console.log(key)
        );
      })
      .catch((err) => console.log(err));
  }

  handleNameChange() {
    fetch("http://localhost:3001/user/update-m-c", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        uid: this.state.uid,
        username: this.state.username,
      }),
    })
      .then((res) => {
        return res.json();
      })

      .then((ress) => {
        if (ress.result === "DONE") {
          this.setState({ nameChange: false });
          alert("USERNAME Changed");
        } else {
          alert(ress.result);
        }
      })
      .catch((err) => console.log(err));
  }

  handleOldPass() {
    fetch("http://localhost:3001/user/update-m-c", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        oldPass: this.state.oldPass,
      }),
    })
      .then((res) => {
        return res.json();
      })

      .then((ress) => {
        if (ress.result === "FOUND") {
          this.setState({ newChange: true });
        } else {
          alert(ress.result);
        }
      })
      .catch((err) => console.log(err));
  }

  handleNewPass() {
    fetch("http://localhost:3001/user/update-m-c", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        uid: this.state.uid,
        newPass: this.state.newPass,
        confPass: this.state.confPass,
      }),
    })
      .then((res) => {
        return res.json();
      })

      .then((ress) => {
        if (ress.result === "DONE") {
          this.setState({ oldChange: false, newChange: false });
          alert("Changed Successful");
        } else {
          alert(ress.result);
        }
      })
      .catch((err) => console.log(err));
  }

  handleOut(e) {
    e.preventDefault();
    localStorage.removeItem("type");
    window.location.reload(false);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleMenu() {
    this.setState({ visible: !this.state.visible });
  }

  handleClose() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const candidateData = localStorage.getItem("candidateData");
    const courseData = localStorage.getItem("courseData");
    let data = JSON.parse(candidateData);
    let course = JSON.parse(courseData);

    const classes = {
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: "10px",
        margin: "auto",
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: "auto",
        display: "block",
        maxWidth: "100px",
        maxHeight: "100px",
      },
    };
    return (
      <div>
        {this.state.conte ? (
          <div>
            <div>
              <AppBar position="static">
                <Toolbar>
                  {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
               </IconButton> */}
                  <Typography variant="h6" className={classes.title}>
                    {this.state.subname}
                  </Typography>
                  {JSON.parse(localStorage.getItem("type")) === "candidate" ? (
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
                        style={{ right: "25px", top: "35px", padding: "0" }}
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
                              conte: !this.state.conte,
                              myCourProf: !this.state.myCourProf,
                              visible: !this.state.visible,
                            });
                          }}
                        >
                          Home
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            this.setState({
                              editProf: !this.state.editProf,
                              conte: !this.state.conte,
                              myCourProf: !this.state.myCourProf,
                              visible: !this.state.visible,
                              username: data.username,
                              mobileno: data.mobileno,
                              email: data.email,
                              uid: data.uid,
                            });
                          }}
                        >
                          Edit Profile
                        </MenuItem>
                        <MenuItem onClick={this.handleOut}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : JSON.parse(localStorage.getItem("type")) === "mentor" ? (
                    <div>
                      <Redirect to="/mentor" />;
                    </div>
                  ) : (
                    <div>
                      <Redirect to="/" />;
                    </div>
                  )}
                </Toolbar>
              </AppBar>
            </div>
            <p>{this.state.coursecontent}</p>
          </div>
        ) : (
          <div>
            {this.state.myCourProf ? (
              <div>
                <div>
                  <AppBar position="static">
                    <Toolbar>
                      {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
               </IconButton> */}
                      <Typography variant="h6" className={classes.title}>
                        My Courses
                      </Typography>
                      {JSON.parse(localStorage.getItem("type")) ===
                      "candidate" ? (
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
                            style={{
                              right: "25px",
                              top: "35px",
                              padding: "0",
                            }}
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
                                  myCourProf: !this.state.myCourProf,
                                  visible: !this.state.visible,
                                });
                              }}
                            >
                              Home
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                this.setState({
                                  editProf: !this.state.editProf,
                                  myCourProf: !this.state.myCourProf,
                                  visible: !this.state.visible,
                                  username: data.username,
                                  mobileno: data.mobileno,
                                  email: data.email,
                                  uid: data.uid,
                                });
                              }}
                            >
                              Edit Profile
                            </MenuItem>
                            <MenuItem onClick={this.handleOut}>Logout</MenuItem>
                          </Menu>
                        </div>
                      ) : JSON.parse(localStorage.getItem("type")) ===
                        "mentor" ? (
                        <div>
                          <Redirect to="/mentor" />;
                        </div>
                      ) : (
                        <div>
                          <Redirect to="/" />;
                        </div>
                      )}
                    </Toolbar>
                  </AppBar>
                </div>
                <div className={classes.root}>
                  <Paper
                    style={{
                      display: "flex",
                      position: "absolute",
                      left: "50px",
                      top: "100px",
                    }}
                    className={classes.paper}
                  >
                    <div
                      style={{
                        display: "block",
                      }}
                    >
                      {data.subject.map((row) => (
                        <Grid
                          style={{
                            display: "inline-flex",
                            position: "relative",
                          }}
                          container
                          xs={3}
                          spacing={2}
                        >
                          <Grid item>
                            <ButtonBase
                              className={classes.image}
                              onClick={() => {
                                this.handleMyCourse(
                                  row.textContent,
                                  row.courseName
                                );
                              }}
                            >
                              <img
                                height="160px"
                                width="250px"
                                alt="complex"
                                src={row.imagePath}
                              />
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={4} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                  Course Name: {row.courseName}
                                </Typography>
                                <br />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  </Paper>
                </div>
              </div>
            ) : this.state.editProf ? (
              <div>
                <div>
                  <AppBar position="static">
                    <Toolbar>
                      {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
               </IconButton> */}
                      <Typography variant="h6" className={classes.title}>
                        Edit Profile
                      </Typography>
                      {JSON.parse(localStorage.getItem("type")) ===
                      "candidate" ? (
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
                            style={{
                              right: "25px",
                              top: "-185px",
                              padding: "0",
                            }}
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
                                  editProf: !this.state.editProf,
                                  visible: !this.state.visible,
                                });
                              }}
                            >
                              Home
                            </MenuItem>
                            <MenuItem onClick={this.handleOut}>Logout</MenuItem>
                          </Menu>
                        </div>
                      ) : JSON.parse(localStorage.getItem("type")) ===
                        "mentor" ? (
                        <div>
                          <Redirect to="/mentor" />;
                        </div>
                      ) : (
                        <div>
                          <Redirect to="/" />;
                        </div>
                      )}
                    </Toolbar>
                  </AppBar>
                </div>
                <div style={{ width: "700px", margin: "25px auto" }}>
                  <Card className={classes.cardroot} variant="outlined">
                    <CardContent>
                      <Typography
                        variant="h4"
                        style={{
                          textAlign: "center",
                          fontFamily: "Roboto,Arial,sans-serif",
                        }}
                        component="h4"
                      >
                        Personal Info
                      </Typography>

                      <Card
                        style={{
                          width: "100%",
                          margin: "25px auto",
                          padding: "0",
                        }}
                        variant="outlined"
                      >
                        <CardContent
                          style={{
                            width: "100%",
                            margin: "25px auto",
                            padding: "0",
                          }}
                        />
                        <Typography
                          style={{
                            fontFamily: "Roboto,Arial,sans-serif",
                            fontSize: "1.375rem",
                            fontWeight: "400",
                            padding: "0 12px",
                            margin: "0 0 4px 0",
                          }}
                          component="h4"
                        >
                          Basic Info
                        </Typography>
                        <List
                          component="nav"
                          className={classes.root}
                          aria-label="mailbox folders"
                        >
                          <ListItem
                            button
                            style={{ padding: "15px 24px 16px 24px" }}
                          >
                            <ListItemText
                              primary="FULL NAME"
                              style={{
                                paddingTop: "4px",
                                width: "156px",
                                marginRight: "24px",
                                maxWidth: "190px",
                              }}
                            />
                            {this.state.nameChange ? (
                              <div>
                                <TextField
                                  required
                                  id="standard-required"
                                  name="username"
                                  defaultValue={this.state.username}
                                  onChange={this.handleChange}
                                />
                                <DoneIcon onClick={this.handleNameChange} />
                              </div>
                            ) : (
                              <div
                                style={{
                                  maxWidth: "410px",
                                  minWidth: "400px",
                                  display: "inline-flex",
                                }}
                              >
                                <ListItemText
                                  style={{ width: "350px" }}
                                  primary={this.state.username}
                                />
                                <CreateIcon
                                  onClick={() => {
                                    this.setState({
                                      nameChange: true,
                                      username: data.username,
                                      mobileno: data.mobileno,
                                      email: data.email,
                                      uid: data.uid,
                                    });
                                  }}
                                />
                              </div>
                            )}
                          </ListItem>
                          <Divider />
                          <ListItem
                            button
                            style={{ padding: "15px 24px 16px 24px" }}
                          >
                            <ListItemText
                              primary="MOBILE NO."
                              style={{
                                paddingTop: "4px",
                                width: "156px",
                                marginRight: "24px",
                                maxWidth: "190px",
                              }}
                            />
                            {this.state.mobChange ? (
                              <div>
                                <TextField
                                  required
                                  name="mobileno"
                                  defaultValue={this.state.mobileno}
                                  onChange={this.handleChange}
                                />
                                <DoneIcon onClick={this.handleMobChange} />
                              </div>
                            ) : (
                              <div
                                style={{
                                  maxWidth: "410px",
                                  minWidth: "400px",
                                  display: "inline-flex",
                                }}
                              >
                                <ListItemText
                                  style={{ width: "350px" }}
                                  primary={this.state.mobileno}
                                />
                                <CreateIcon
                                  onClick={() => {
                                    this.setState({
                                      mobChange: true,
                                      username: data.username,
                                      mobileno: data.mobileno,
                                      email: data.email,
                                      uid: data.uid,
                                    });
                                  }}
                                />
                              </div>
                            )}
                          </ListItem>
                          <Divider />
                          <ListItem
                            button
                            style={{ padding: "15px 24px 16px 24px" }}
                          >
                            <ListItemText
                              style={{
                                paddingTop: "4px",
                                width: "156px",
                                marginRight: "24px",
                                maxWidth: "190px",
                              }}
                              primary="PASSWORD"
                            />
                            {this.state.oldChange ? (
                              this.state.newChange ? (
                                <div
                                  style={{
                                    maxWidth: "351px",
                                    minWidth: "351px",
                                  }}
                                >
                                  <TextField
                                    required
                                    id="standard-required"
                                    name="newPass"
                                    style={{ maxWidth: "200px" }}
                                    placeholder="New Password"
                                    onChange={this.handleChange}
                                  />
                                  <TextField
                                    required
                                    id="standard-required"
                                    name="confPass"
                                    style={{ maxWidth: "200px" }}
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                  />
                                  <DoneIcon
                                    style={{ textAlign: "right" }}
                                    onClick={this.handleNewPass}
                                  />
                                </div>
                              ) : (
                                <div
                                  style={{
                                    maxWidth: "351px",
                                    minWidth: "351px",
                                  }}
                                >
                                  <TextField
                                    required
                                    id="standard-required"
                                    name="oldPass"
                                    style={{ maxWidth: "200px" }}
                                    placeholder="Old Password"
                                    onChange={this.handleChange}
                                  />
                                  <DoneIcon
                                    style={{ textAlign: "right" }}
                                    onClick={this.handleOldPass}
                                  />
                                </div>
                              )
                            ) : (
                              <div
                                style={{
                                  maxWidth: "410px",
                                  minWidth: "400px",
                                  display: "inline-flex",
                                }}
                              >
                                <ListItemText
                                  style={{ width: "350px" }}
                                  primary="**********"
                                />
                                <CreateIcon
                                  onClick={() => {
                                    this.setState({
                                      oldChange: true,
                                      username: data.username,
                                      mobileno: data.mobileno,
                                      email: data.email,
                                      uid: data.uid,
                                    });
                                  }}
                                />
                              </div>
                            )}
                          </ListItem>
                        </List>
                        <CardActions />
                      </Card>
                    </CardContent>
                    <CardActions />
                  </Card>
                </div>
              </div>
            ) : (
              <div>
                <AppBar position="static">
                  <Toolbar>
                    {this.state.username === null ? (
                      <Typography variant="h6" className={classes.title}>
                        Hi {data.username} !
                      </Typography>
                    ) : (
                      <Typography variant="h6" className={classes.title}>
                        Hi {this.state.username} !
                      </Typography>
                    )}
                    {JSON.parse(localStorage.getItem("type")) ===
                    "candidate" ? (
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
                          style={{
                            right: "25px",
                            top: "35px",
                            padding: "0",
                          }}
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
                                editProf: !this.state.editProf,
                                visible: !this.state.visible,
                                username: data.username,
                                mobileno: data.mobileno,
                                email: data.email,
                                uid: data.uid,
                              });
                            }}
                          >
                            Edit Profile
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              this.setState({
                                myCourProf: !this.state.myCourProf,
                                visible: !this.state.visible,
                              });
                            }}
                          >
                            My Courses
                          </MenuItem>
                          <MenuItem onClick={this.handleOut}>Logout</MenuItem>
                        </Menu>
                      </div>
                    ) : JSON.parse(localStorage.getItem("type")) ===
                      "candidate" ? (
                      <div>
                        <Redirect to="/candidate" />;
                      </div>
                    ) : (
                      <div>
                        <Redirect to="/" />;
                      </div>
                    )}
                  </Toolbar>
                </AppBar>
                <div className={classes.root}>
                  <Paper
                    style={{
                      display: "flex",
                      position: "absolute",
                      left: "50px",
                      top: "100px",
                    }}
                    className={classes.paper}
                  >
                    <div
                      style={{
                        display: "block",
                      }}
                    >
                      {course.map((row) => (
                        <Grid
                          style={{
                            display: "inline-flex",
                            position: "relative",
                          }}
                          container
                          xs={3}
                          spacing={2}
                        >
                          <Grid item>
                            <ButtonBase
                              className={classes.image}
                              onClick={() => {
                                this.handlePurchase(row, data.cid);
                              }}
                            >
                              <img
                                height="160px"
                                width="250px"
                                alt="complex"
                                src={row.imagePath}
                              />
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={4} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                  Course Name: {row.courseName}
                                </Typography>
                                <Typography variant="body2">
                                  Actual Price:{" "}
                                  <span
                                    style={{
                                      textDecoration: "line-through",
                                    }}
                                  >
                                    {row.actualPrice}
                                  </span>
                                </Typography>
                                <Typography variant="subtitle1">
                                  Discounted Price: {row.discountPrice}
                                </Typography>
                                <br />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  </Paper>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Candidate;
