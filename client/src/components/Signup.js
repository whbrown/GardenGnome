import React, { Component } from "react";
import { signup } from "../services/auth";
import axios from 'axios'

let handleUpload = (theFile) => {
  // console.log('file in service: ', theFile)
  return axios.post('/api/upload', theFile)
    .then(response => response.data)
    .catch(err => err.response.data);
}

class Signup extends Component {
  state = {
    username: "",
    password: "",
    imageUrl: "https://www.amcorro.com/wp-content/uploads/2013/05/user-icon-1.png",
    uploadOn: false,
    error: ""
  };

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url, uploadOn: false });
        console.log(response)
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    signup(this.state.username, this.state.password, this.state.imageUrl).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect to "/projects"
        this.props.history.push("/mygarden/myplants");
      }
    });
  };

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="file"
            name="imageUrl"
            onChange={(e) => this.handleFileUpload(e)} />

          {this.state.error && (
            <p variant="danger">{this.state.error}</p>
          )}
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
