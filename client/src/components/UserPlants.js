import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import '../App.css'

/* ---------------------------------------------------------- Styled Components --------------------------------------------------------- */
import CardHeading from './reuse/CardHeading'
import CardSubheading from './reuse/CardSubheading'
import PlantCard from './reuse/PlantCard'

const Img = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

class UserPlants extends Component {

  state = {
    companionInfo: [],
    renderedCompanionInfo: false,
  }

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

  findCompanions = (plant) => {
    console.log('axios get plant._id', plant._id);
    axios.get(`/api/plants/search/companions/${plant._id}`).then((res) => {
      console.log('companion res', res.data)
    }).catch(err => console.log(err))
  }

  // Do a componentDidMount where you do a GET request for the user
  async componentDidMount() {
    await this.renderMyGarden();
    console.log('user plants props !', this.props);
  }

  // componentDidUpdate() {
  //   console.log('update', this.props);
  //   let companionRes = [];
  //   if (!this.state.renderedCompanionInfo) {
  //     this.props.targetUser.garden.map(plant => {
  //       (async () => {
  //         // console.log(this.prop)
  //         console.log('plant', plant.plantId._id);
  //         const companion = await this.findCompanions(plant.plantId);
  //         await companionRes.push(companion);
  //       })()
  //     })
  //   }
  // }


  render() {
    let companionInfo = {};
    // console.log("CURRENT USER: ", this.props.targetUser)
    return (
      <div>
<<<<<<< HEAD
        {this.props.targetUser.garden && this.props.targetUser.garden.map(plant => {
          // console.log("EACH USER's PLANT: ", plant)
          // gonna error on first render due to it being before return
          const encodedLatinName = encodeURI(plant.plantId.plantLatinName);
          // Avoids the initial render error where user's plantId is NULL and throws an error
          return (plant.plantId && (
            <>
            <PlantCard key={plant._id} id={`${plant._id}`}>
              <Link to={`/plants/id=${plant.plantId._id}&latinName=${encodedLatinName}`} key={plant._id}>
                <Img src={plant.plantId.plantImageURL} alt="" />
              </Link>
              <div style={{ width: "53%", justifyContent: "center" }}>
                <Link to={`/plants/id=${plant.plantId._id}&latinName=${encodedLatinName}`} key={plant._id}>
                  <CardHeading>{plant.plantId.plantLatinName}</CardHeading>
                  <CardSubheading>{plant.name}</CardSubheading>
                </Link>
              </div>
              <IconButton onClick={() => this.removeFromGarden(plant._id)} aria-label="delete" style={{ padding: 0, margin: 0 }}>
                <DeleteIcon />
              </IconButton>
            </PlantCard>
            {/* <PlantCard>
               <div className={`${companionInfo}-${plant.plantId._id}`}>
               {console.log('companionInfo', companionInfo)}
                  {companionInfo[plant.plantId._id] ? <>found</> : <></>}
               </div>
            </PlantCard> */}
            </>
          )
          )
        })}
=======
        {this.props.targetUser.garden && (this.props.targetUser.garden.length == 0 ?
          <p style={{ margin: "20px" }}>No plants to show</p> : this.props.targetUser.garden.map(plant => {
            // Avoids the initial render error where user's plantId is NULL and throws an error
            return (plant.plantId && (
              <PlantCard key={plant._id} className="easeIn fadeIn">
                <Link to={`/plants/id=${plant.plantId._id}&latinName=${encodeURI(plant.plantId.plantLatinName)}`} key={plant._id}>
                  <Img src={plant.plantId.plantImageURL} alt="" />
                </Link>
                <div style={{ width: "53%", justifyContent: "center" }}>
                  <Link to={`/plants/id=${plant.plantId._id}&latinName=${encodeURI(plant.plantId.plantLatinName)}`} key={plant._id}>
                    <CardHeading>{plant.plantId.plantLatinName}</CardHeading>
                    <CardSubheading>{plant.name}</CardSubheading>
                  </Link>
                </div>
                <IconButton onClick={() => this.removeFromGarden(plant._id)} aria-label="delete" style={{ padding: 0, margin: 0 }}>
                  <DeleteIcon />
                </IconButton>
              </PlantCard>
            )
            )
          })
        )
        }
>>>>>>> 5b7d442213724f7a7306cb0404915c77709d147b
        {this.props.match.params.id == this.props.user._id &&
          //   <button>Add plant to my garden</button>
          <Fab color="primary" aria-label="add" style={{ backgroundColor: "green", margin: "20px 0 0 15px" }} className="fadeIn flicker">
            <Link to="/plants/search" style={{ textDecoration: 'none', color: "white" }}>
              <AddIcon />
            </Link>
          </Fab>
        }
        {/* "For each" loop through all the users plants here to display CARDS? of each plant*/}
      </div >
    )
  }
}

export default UserPlants;