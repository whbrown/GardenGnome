import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import styled, { css } from 'styled-components'

/* ---------------------------------------------------------- STYLED COMPONENTS --------------------------------------------------------- */

const Nav = styled.nav`
  margin: 0;
  padding: 0;
  background-color: white;
  height: 60px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 12px;
  text-align: center;
  box-shadow: 0 -1px 5px rgba(0,0,0,.1);
`
const P = styled.p`
  /* color: ${props => props.color}; */
  color: rgb(37, 37, 37);
`

const Img = styled.img`
  height: ${props => props.height};
`

/* ---------------------------------------------------------- NAVBAR RENDERING ---------------------------------------------------------- */

const Navbar = props => {
  const handleLogout = () => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    props.setUser(null);
  };

  const handleClick = () => {
    props.history.push(`/user/${props.user._id}/plants`)
  }

  return (
    <Nav className="navbar-nav fixed-bottom container-fluid">
      {props.user ? (
        <>
          <Link className="nav-item nav-link" to={`/user/${props.user._id}/plants`} onClick={handleClick}>
            <Img src="../../assets/leaf.svg" alt="my garden" height="30px" />
            <P>Garden</P >
          </Link>
          <Link className="nav-item nav-link" to="/gnomes">
            <Img src="../../assets/map.svg" alt="local gnomes" height="30px" />
            <P>Gnomes</P >
          </Link>
          <Link className="nav-item nav-link" to="/plants/search">
            <Img src="../../assets/search.svg" alt="search plants" height="30px" />
            <P>Search</P >
          </Link>
          <Link className="nav-item nav-link" to="/" onClick={handleLogout}>
            <Img src="../../assets/logout.svg" alt="" height="30px" />
            <P>Logout</P >
          </Link>
        </>
      ) : (
          <>
            <Link className="nav-item nav-link" to="/">
              <Img src="../../assets/star.svg" alt="discover" height="30px" />
              <P>Discover</P >
            </Link>
            <Link className="nav-item nav-link" to="/">
              <Img src="../../assets/search.svg" alt="search plants" height="30px" />
              <P>Search</P >
            </Link>
          </>
        )}
    </Nav>
  );
};

export default Navbar;
