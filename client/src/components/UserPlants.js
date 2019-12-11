import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'

/* ---------------------------------------------------------- Styled Components --------------------------------------------------------- */
import PageHeading from './reuse/PageHeading'
import H3 from './reuse/H3'
import H4 from './reuse/H4'
import CardHeading from './reuse/CardHeading'
import CardSubheading from './reuse/CardSubheading'
import PlantCard from './reuse/PlantCard'
import ButtonGreen from './reuse/ButtonGreen'

const Img = styled.img`
  width: 120px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
`

class UserPlants extends Component {

  removeFromGarden = (plantId) => {
    axios
      .post("/api/plants/removefromgarden", { plantId: plantId })
      .then(response => {
        this.props.setTargetUser(response.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderMyGarden = () => {
    axios
      .get(`/api/user/${this.props.match.params.id}/plants`)
      .then(response => {
        this.props.setTargetUser(response.data)
      })
  }

  // Do a componentDidMount where you do a GET request for the user
  componentDidMount() {
    this.renderMyGarden();
  }

  render() {
    console.log("CURRENT USER: ", this.props.targetUser)
    return (
      <div>
        {this.props.targetUser.garden && this.props.targetUser.garden.map(plant => {
          console.log("EACH USER's PLANT: ", plant)
          const encodedLatinName = encodeURI(plant.plantId.plantLatinName);
          // Avoids the initial render error where user's plantId is NULL and throws an error
          return (plant.plantId && (
            <PlantCard key={plant._id}>
              <Link to={`/plants/id=${plant.plantId._id}&latinName=${encodedLatinName}`} key={plant._id}>
                <Img src={plant.plantId.plantImageURL} alt="" />
              </Link>
              <div style={{ width: "60%" }}>
                <Link to={`/plants/id=${plant.plantId._id}&latinName=${encodedLatinName}`} key={plant._id}>
                  <CardHeading>{plant.plantId.plantLatinName}</CardHeading>
                  <CardSubheading>{plant.name}</CardSubheading>
                </Link>
                <ButtonGreen onClick={() => this.removeFromGarden(plant._id)} type="button" className="btn btn-success">Delete</ButtonGreen>
              </div>
            </PlantCard>
          )
          )
        })}
        {/* Placeholder button which  */}
        {this.props.match.params.id == this.props.user._id &&
          <Link to="/plants/search">
            <button>Add plant to my garden</button>
          </Link>
        }
        {/* "For each" loop through all the users plants here to display CARDS? of each plant*/}
      </div >
    )
  }
}

export default UserPlants;