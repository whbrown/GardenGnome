import React, { Component } from "react";
import { login } from "../services/auth";
import BackButton from './reuse/BackButton'
import "../App.css"

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClick = () => {
    this.props.history.goBack()
  }

  handleSubmit = event => {
    event.preventDefault();

    login(this.state.username, this.state.password).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect to gardens page with plants
        this.props.history.push(`/user/${data._id}/plants`);
      }
    });
  };

  render() {
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }} className="fadeIn">
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              className="form-control"
              id="username"
              value={this.state.username}
              onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          {/* <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="geolocationCheck" />
            <label className="form-check-label" for="geolocationCheck">Use my current location</label>
          </div> */}
          {this.state.error && (
            <p variant="danger">{this.state.error}</p>
          )}
          <button type="submit" style={{ border: "none", borderRadius: "15px", height: "30px", width: "150px", marginTop: "10px", backgroundColor: "green", color: "white" }} >Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
