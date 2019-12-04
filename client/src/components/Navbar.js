import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";

const Navbar = props => {
  const handleLogout = () => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    props.clearUser(null);
  };

  return (
    <Nav className="nav justify-content-end" bg="primary">
      {props.user ? (
        <>
          <Link to="/">Welcome {props.user.username}</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </>
      ) : (
          <React.Fragment>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </React.Fragment>
        )}
    </Nav>
  );
};

export default Navbar;
