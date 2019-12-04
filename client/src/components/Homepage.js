import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Signup from "./Signup"

class Homepage extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  render() {
    return(
      <Signup />
    )
  }
  
}

export default Homepage;