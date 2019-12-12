import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'
import CardHeading from './reuse/CardHeading'
import PlantCard from './reuse/PlantCard'
import CardSubheading from './reuse/CardSubheading'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton';

const Img = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
`
class UserWishlist extends Component {

  removeFromWishlist = (plantId) => {
    axios
      .post("/api/plants/removefromwishlist", { plantId: plantId })
      .then(response => {
        this.props.setTargetUser(response.data)
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
        console.log("CURRENT USER AND THIER WISHLIST STATE>>> ", response.data)
      })
  }

  // Do a componentDidMount where you do a GET request for the user
  componentDidMount() {
    this.renderWishlist();
  }

  render() {
    console.log("TARGET USER's wishlist on wishlist page: ", this.props.targetUser.wishList)
    return (
      < div >
        {this.props.targetUser.wishList && this.props.targetUser.wishList.map((plant, index) => {
          // Avoids the initial render error where user's plantId is NULL and throws an error
          return (plant.plantId && (
            <PlantCard key={index}>
              <Link to={`/plants/id=${plant.plantId._id}&latinName=${encodeURI(plant.plantId.plantLatinName)}`}>
                <Img src={plant.plantId.plantImageURL} alt="" />
              </Link>
              <div style={{ width: "53%", justifyContent: "center" }}>
                <Link to={`/plants/id=${plant._id}&latinName=${encodeURI(plant.plantId.plantLatinName)}`}>
                  <CardHeading>{plant.plantId.plantLatinName}</CardHeading>
                  <CardSubheading>{plant.name}</CardSubheading>
                </Link>
              </div>
              <IconButton onClick={() => this.removeFromWishlist(plant._id)} aria-label="delete" style={{ padding: 0, margin: 0 }}>
                <DeleteIcon />
              </IconButton>
            </PlantCard>
          )
          )
        })
        }
      </div >
    )
  }
}

export default UserWishlist;