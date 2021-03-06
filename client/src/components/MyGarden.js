import React, { Component } from "react";
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'
import MyPlants from './MyPlants'
import PageHeading from './reuse/PageHeading'
import H3 from './reuse/H3'
import H4 from './reuse/H4'
import H5 from './reuse/CardHeading'
import UserCard from './reuse/UserCard'
import BackButton from './reuse/BackButton'


class MyGarden extends Component {

  handleClick = () => {
    this.props.history.goBack()
  }

  renderMyGarden = () => {
    axios
      .get('/api/plants/mygarden')
      .then(response => {
        console.log("SUCCESSFUL GET REQUEST OF USER", response)
        this.props.setUser(response.data)
      })
  }

  // Do a componentDidMount where you do a GET request for all the garden plants
  componentDidMount() {
    this.renderMyGarden();
  }

  render() {
    console.log("USER INFORMATION: ", this.props.user)
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }}>
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <PageHeading textAlign="left" margin="(65px 0 0 0)">My Garden</PageHeading>
        <UserCard>
          <img src={this.props.user.imageUrl} alt="" style={{ height: "80px" }} />
          <div>
            <H3>User:</H3>
            <H4 textAlign="left">{this.props.user.username}</H4>
          </div>
          <button>Follow</button>
        </UserCard>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
          <Link to="/mygarden/myplants">
            <H4>My Plants</H4>
          </Link>
          <Link to="/mygarden/followers">
            <H4>Followers</H4>
          </Link>
          <Link to="/mygarden/followering">
            <H4>Following</H4>
          </Link>
        </div>
        <Route exact path="/mygarden/myplants"
          render={props => <MyPlants {...props} user={this.props.user} setUser={this.props.setUser} />} />
      </div >
    )
  }
}

export default MyGarden;