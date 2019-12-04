import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = props => {
  const handleLogout = () => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    props.setUser(null);
  };

  console.log(props)
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light container-fluid" style={{ margin: "0", padding: "0" }}>
      {props.user ? (
        <>
          <div className="navbar-nav row-fluid" style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <Link className="nav-item nav-link col-2.2" to="/">MY GARDEN</Link>
            <Link className="nav-item nav-link col-2.2" to="/">LOCAL GNOMES</Link>
            <Link className="nav-item nav-link col-2.2" to="/">DISCOVER</Link>
            <Link className="nav-item nav-link col-2.2" to="/">SEARCH PLANTS</Link>
            <Link className="nav-item nav-link col-2.2" to="/" onClick={handleLogout}>LOGOUT</Link>
          </div>
        </>
      ) : (
          <>
            <div className="navbar-nav row-fluid" style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <Link className="nav-item nav-link" to="/">DISCOVER</Link>
              <Link className="nav-item nav-link" to="/">SEARCH PLANTS</Link>
            </div>
          </>
        )}
    </nav>
  );
};

export default Navbar;
