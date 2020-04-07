import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOut = this.handleOut.bind(this);
  }

  handleOut(e) {
    e.preventDefault();
    localStorage.removeItem("email");
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        {JSON.parse(localStorage.getItem("email")) ? (
          JSON.parse(localStorage.getItem("email")).uid === 2 ? (
            <div>
              <h1>Candidate</h1>
              <button type="submit" name="LogOut" onClick={this.handleOut}>
                Log-Out
              </button>
            </div>
          ) : (
            <div>
              <Redirect to="/" />;
            </div>
          )
        ) : (
          <div>
            <Redirect to="/candidate/" />;
          </div>
        )}
      </div>
    );
  }
}

export default Candidate;
