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
    localStorage.removeItem("type");
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        {JSON.parse(localStorage.getItem("type")) === "candidate" ? (
          <div>
            <h1>Candidate</h1>
            <button type="submit" name="LogOut" onClick={this.handleOut}>
              Log-Out
            </button>
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
      </div>
    );
  }
}

export default Candidate;
