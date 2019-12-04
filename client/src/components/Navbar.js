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

  return (
    <nav className="navbar fixed-bottom navbar-light bg-light container-fluid" style={{ margin: "0", padding: "0" }}>
      {props.user ? (
        <>
          <div className="navbar-nav row-fluid">
            <Link className="nav-item nav-link col-2.2" to="/mygarden">
              <img src="../../assets/leaf.svg" alt="my garden" className="navIcon" />
              MY GARDEN
              </Link>
            <Link className="nav-item nav-link col-2.2" to="/">
              <img src="../../assets/map.svg" alt="local gnomes" className="navIcon" />
              LOCAL GNOMES</Link>
            <Link className="nav-item nav-link col-2.2" to="/">
              <img src="../../assets/star.svg" alt="discover" className="navIcon" />
              DISCOVER</Link>
            <Link className="nav-item nav-link col-2.2" to="/">
              <img src="../../assets/search.svg" alt="search plants" className="navIcon" />
              SEARCH PLANTS</Link>
            <Link className="nav-item nav-link col-2.2" to="/" onClick={handleLogout}>
              <img src="../../assets/logout.svg" alt="" className="navIcon" />
              LOGOUT</Link>
          </div>
        </>
      ) : (
          <>
            <div className="navbar-nav row-fluid">
              <Link className="nav-item nav-link" to="/">
                <img src="../../assets/star.svg" alt="discover" className="navIcon" />
                DISCOVER</Link>
              <Link className="nav-item nav-link" to="/">
                <img src="../../assets/search.svg" alt="search plants" className="navIcon" />
                SEARCH PLANTS</Link>
            </div>
          </>
        )}
    </nav>
  );
};

export default Navbar;
