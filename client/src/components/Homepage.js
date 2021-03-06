import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import PageHeading from './reuse/PageHeading'
import '../App.css';

const Home = styled.div`
  background-image: url('https://images.unsplash.com/photo-1534710961216-75c88202f43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80');
  background-size: cover;
  /* height: 120vh; */
  /* background-position: center; */
  background-color: hsla(0,0%,100%,0.7);
  background-blend-mode: overlay;
  height: 90vh;
  overflow: scroll;
  img {
    width: 300px;
  }
  @media (min-width: 1000px) {
    img {
      width: 300px;
    }
  }
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
        <p style={{ color: "#333", fontWeight: "600", margin: '0 3em' }}>Your pocket guide to growing healthy and happy plants. </p>
        <p style={{ color: "#333", fontWeight: "500", margin: '0 3em' }}>Access our database of over 300,000 plants and <span style={{fontWeight: '600'}}>search</span> for in-depth information on care and maintenance.</p>
        {!this.props.user && // only show if logged out
          <div style={{ display: "flex", flexDirection: "column", paddingBottom: '4em' }}>
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
