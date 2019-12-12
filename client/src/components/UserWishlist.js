import React, { Component } from "react";
import { Route } from 'react-router-dom';
// import { Link } from "react-router-dom";
import axios from 'axios'
import PageHeading from './reuse/PageHeading'
import H3 from './reuse/H3'
import H4 from './reuse/H4'
import CardHeading from './reuse/CardHeading'
import PlantCard from './reuse/PlantCard'
import styled from 'styled-components'


const Img = styled.img`
  width: 120px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
`

class UserWishlist extends Component {

  handleClick = () => {
    axios
      .post("/api/plants/mygarden")
      .then(response => {
        this.props.setUser(response.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderWishlist = () => {
    axios
      .get(`/api/user/${this.props.match.params.id}/wishlist`)
      .then(response => {
        this.props.setTargetUser(response.data)
      })
  }

  // Do a componentDidMount where you do a GET request for the user
  componentDidMount() {
    this.renderWishlist();
  }

  render() {
    return (
      <div>
        {this.props.targetUser.wishList && this.props.targetUser.wishList.map(plant => {
          // Avoids the initial render error where user's plantId is NULL and throws an error
          return (plant.plantId && (
            <PlantCard key={plant._id}>
              <Img src={plant.plantId.plantImageURL} alt="" />
              <div>
                <CardHeading> {plant.name}</CardHeading>
                <h4>{plant.plantId.plantCommonName}</h4>
              </div>
            </PlantCard>
          )
          )
        })}
      </div >
    )
  }
}

export default UserWishlist;