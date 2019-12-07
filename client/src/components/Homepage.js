import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../App.css';



class Homepage extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  render() {
    console.log(this.props.user)
    return (
      <div className="homepage">
        <img src="../../assets/gnome.svg" alt="Garden Gnome" style={{ width: "30vw" }} />
        <h2>Gnome</h2>
        <p>Your pocket guide to growing healthy and happy plants. Access our database of over 300,000 plants and their in-depth information on care and maintenance</p>
        <p>Use our social platform to donate, adopt, buy or sell plants with local growers or find nearby farmers markets to share your produce!</p>
        {!this.props.user && // only show if logged out
        <div>
          <Link to="/signup"><button type="button" className="btn btn-primary">Signup</button></Link>
          <Link to="/login"><button type="button" className="btn btn-success">Login</button></Link>
        </div>
        }
      </div>
    );
  }
}

export default Homepage;
