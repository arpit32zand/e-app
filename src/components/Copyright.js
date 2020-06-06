import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class Copyright extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    }

    this.handleCall = this.handleCall.bind(this);
  }

  handleCall(e) {
    this.props.onHandleCall(e.target.value);
  }

  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link
          href="http://localhost:3000/"
          value="signin"
          onClick={this.handleCall}
          // style={classes.links}
          color="inherit"
        >
          {"E-GURU"}
        </Link>
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
}

export default Copyright;
