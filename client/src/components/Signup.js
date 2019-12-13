import React, { Component } from "react";
import { signup } from "../services/auth";
import axios from 'axios'
import BackButton from './reuse/BackButton'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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

  handleClick = () => {
    this.props.history.goBack()
  }

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
        this.props.history.push(`/user/${this.props.user._id}/plants`);
      }
    });
  };

  render() {
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }} className="fadeIn">
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
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
          <input
            type="file"
            name="imageUrl"
            onChange={(e) => this.handleFileUpload(e)} />
          {this.state.error && (
            <p variant="danger">{this.state.error}</p>
          )}
          <button type="submit" style={{ border: "none", borderRadius: "15px", height: "30px", width: "150px", marginTop: "10px", backgroundColor: "green", color: "white" }} >Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;
