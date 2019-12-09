import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'
import UserPlants from './UserPlants'
import PageHeading from './reuse/PageHeading'
import H3 from './reuse/H3'
import H4 from './reuse/H4'
import H5 from './reuse/CardHeading'
import UserCard from './reuse/UserCard'
import BackButton from './reuse/BackButton'


class UserGarden extends Component {

  handleClick = () => {
    this.props.history.goBack()
  }

  followUser = () => {
    axios
      .patch(`/api/user/${this.props.match.params.id}/follow`)
      .then((followedUser) => { console.log("SUCESSFUL FOLLOW!!!", followedUser) })
  }

  renderMyGarden = () => {
    axios
      .get(`/api/user/${this.props.match.params.id}/plants`)
      // .get(`/api/targetUser/${this.props.targetUser._id}/plants`)
      .then(response => {
        this.props.setTargetUser(response.data)
      })
  }

  // // Do a componentDidMount where you do a GET request for all the garden plants
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.renderMyGarden()
    }
  }

  render() {
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }}>
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <PageHeading textAlign="left" margin="(65px 0 0 0)">Garden</PageHeading>
        <UserCard>
          <img src={this.props.targetUser.imageUrl} alt="" style={{ height: "80px" }} />
          <div>
            <H3>User:</H3>
            <H4 textAlign="left">{this.props.targetUser.username}</H4>
          </div>
          <div>
            <div>
              <H3>Followers (x)</H3>
              <H3>Following (x)</H3>
            </div>
            <button onClick={this.followUser}>Follow</button>
          </div>
        </UserCard>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
          <Link to={`/user/${this.props.targetUser._id}/plants`}>
            <H4>Plants</H4>
          </Link>
          <Link to={`/user/${this.props.targetUser._id}/comments`}>
            <H4>Comments</H4>
          </Link>
          <Link to={`/user/${this.props.targetUser._id}/wishlist`}>
            <H4>Wishlist</H4>
          </Link>
        </div>
        {this.props.children}
      </div >
    )
  }
}

export default UserGarden;