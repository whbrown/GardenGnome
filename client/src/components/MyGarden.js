import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from 'axios'
import H2 from './reuse/H2'
import H3 from './reuse/H3'
import H4 from './reuse/H4'
import PlantCard from './reuse/PlantCard'
import UserCard from './reuse/UserCard'
import styled, { css } from 'styled-components'


const Img = styled.img`
  width: 100px;
`

class MyGarden extends Component {

  renderMyGarden = () => {
    axios
      .get('/api/plants/mygarden')
      .then(response => {
        console.log("SUCCESSFUL GET REQUEST OF USER", response)
        this.props.setUser(response.data)
      })
  }

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

  // Do a componentDidMount where you do a GET request for all the garden plants
  componentDidMount() {
    this.renderMyGarden();
  }

  render() {
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }}>
        <H2 textAlign="left" margin="(65px 0 0 0)">My Garden</H2>
        <UserCard>
          <img src="https://www.stickpng.com/assets/thumbs/585e4beacb11b227491c3399.png" alt="" style={{ width: "50px" }} />
          <H3 textAlign="left">{this.props.user.username}</H3>
        </UserCard>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
          <H4>My Plants</H4>
          <H4>Followers</H4>
          <H4>Following</H4>
        </div>
        {this.props.user.garden.map(plant => {
          // Avoids the initial render error where user's plantId is NULL and throws an error
          return (plant.plantId && (
            <PlantCard key={plant._id}>
              <h3> {plant.name}</h3>
              <h4>{plant.plantId.plantCommonName}</h4>
              <Img src={plant.plantId.plantImageURL} alt="" />
            </PlantCard>)
          )
        })}
        {/* Placeholder button which  */}
        <button onClick={this.handleClick}>Add plant to my garden</button>
        {/* "For each" loop through all the users plants here to display CARDS? of each plant*/}
      </div >
    )
  }
}

export default MyGarden;