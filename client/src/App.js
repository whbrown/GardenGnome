import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Homepage from "./components/Homepage.js";

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
    return (
      <div className="App">
        <h1>Garden Gnome</h1>
        <Route exact path="/" component={Homepage} />
      </div>
    );
  }
}

export default App;