import React, { Component } from "react";
import { Link } from "react-router-dom";


class Homepage extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  render() {
    return (
      <div>
        <h2>Homepage</h2>

        <Link to="/signup"><button type="button" className="btn btn-primary">Signup</button></Link>
        <Link to="/login"><button type="button" className="btn btn-success">Login</button></Link>
      </div>
    );
  }
}

export default Homepage;
