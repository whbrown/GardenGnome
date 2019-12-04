import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MyGarden from "./components/MyGarden";

// MAKING PUBLIC FOLDER STATIC?
// const express = require("express");
// const path = require("path");
// const app = express();
// app.use(express.static(path.join(__dirname, "public")));

class App extends Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    console.log("CURRENT USER: ", this.state.user)
    return (
      <div className="App">
        <Route exact path="/" render={props => <Homepage {...props} setUser={this.setUser} />} />
        <Route exact path="/login"
          render={props => <Login {...props} setUser={this.setUser} />} />
        <Route exact path="/signup"
          // component={Signup}
          render={props => <Signup {...props} setUser={this.setUser} />} />
        <Route path="/mygarden"
          render={props => <MyGarden {...props} user={this.state.user} setUser={this.setUser} />} />

        {/* NavBar Below */}
        <Route path="/"
          render={props => <Navbar {...props} user={this.state.user} setUser={this.setUser} />} />
      </div>
    );
  }
}

export default App;