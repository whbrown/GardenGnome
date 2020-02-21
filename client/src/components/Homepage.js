import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import PageHeading from './reuse/PageHeading'
import '../App.css';

const Home = styled.div`
  /* background-image: url('https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'); */
  background-image: url('https://images.unsplash.com/photo-1534710961216-75c88202f43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80');
  background-size: cover;
  height: 100vh;
  /* background-position: center; */
  background-color: hsla(0,0%,100%,0.7);
  background-blend-mode: overlay;
`

class Homepage extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  render() {
    // console.log(this.props.user)
    return (
      <Home className="fadeIn Homepage" style={{ textAlign: "center", marginBottom: "80px", padding: "1rem" }} >
        <img src="../../assets/gnome.svg" alt="Garden Gnome" style={{ width: "300px", marginTop: "80px" }} />
        <h1 style={{ color: "Green", fontWeight: "bolder" }}>Gnome</h1>
        <p style={{ color: "#333", fontWeight: "400" }}>Your pocket guide to growing healthy and happy plants. </p>
        <p style={{ color: "#333", fontWeight: "400" }}>Access our database of over 300,000 plants and their in-depth information on care and maintenance</p>
        {!this.props.user && // only show if logged out
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Link to="/login">
              <button type="button" style={{ border: "none", borderRadius: "15px", height: "30px", width: "150px", marginTop: "20px", backgroundColor: "green", color: "white" }} >Login</button>
            </Link>
            <Link to="/signup">
              <button type="button" style={{ border: "none", borderRadius: "15px", height: "30px", width: "150px", marginTop: "20px", backgroundColor: "#1976D2", color: "white" }} >Signup</button>
            </Link>
          </div>
        }
      </Home>
    );
  }
}

export default Homepage;
