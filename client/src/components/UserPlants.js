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
import CompanionInfo from "./CompanionInfo";

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
    companionPlants: [],
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

  findCompanions = async (plant) => {
    console.log('axios get plant._id', plant._id);
    await axios.get(`/api/plants/search/companions/${plant._id}`).then((res) => {
      console.log('companion res', res.data.companionResponse)
      this.setState({
        companionPlants: [res.data.companionResponse]
      })
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

  // tableCreate = async (companion) => {
  //   console.log(companion)
  //   await this.setState({
  //     companion: companion
  //   })
  // }

  resetCompanionsTable = () => {
    this.setState({
      companionPlants: [],
    })
  }

  toggleCompanions = (plant) => {
    const div = document.getElementById(plant._id);
    console.log(div);
    const companionInfo = (async () => {
      const companion = await this.findCompanions(plant);
      if (div.children.length < 2) {
        ( async (companion) => console.log(companion))(companion);
        // await this.tableCreate(companion)
      }
    })()
    
  }


  render() {
    console.log('state', this.state)
    let companionInfo = {};
    // console.log("CURRENT USER: ", this.props.targetUser)
    return (
      <div>
        {this.props.targetUser.garden && (this.props.targetUser.garden.length == 0 ?
          <p style={{ margin: "20px" }}>No plants to show</p> : this.props.targetUser.garden.map(plant => {
            // Avoids the initial render error where user's plantId is NULL and throws an error
            return (plant.plantId && (
              <div id={plant.plantId._id}>
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
                {this.props.match.params.id == this.props.user._id &&
                  <IconButton onClick={() => this.removeFromGarden(plant._id)} aria-label="delete" style={{ padding: 0, margin: 0 }}>
                    <DeleteIcon />
                  </IconButton>
                }
<<<<<<< HEAD
                <div style={{width: '100%', display: 'flex', justifyContent: 'center',}}>
                  <button className="learn-more" style={{alignSelf: 'center', justifySelf: 'center', margin: "1em"}} onClick={() => this.toggleCompanions(plant.plantId)}>Show Companions</button>
                </div>
=======
>>>>>>> 17328265eed177ba4f7ba34a5157bf644db83a4c
              </PlantCard>
              </div>
            )
            )
          })
        )
        }
        {this.props.match.params.id == this.props.user._id &&
          //   <button>Add plant to my garden</button>
          <Fab color="primary" aria-label="add" style={{ backgroundColor: "green", margin: "20px 0 0 15px" }} className="fadeIn flicker">
            <Link to="/plants/search" style={{ textDecoration: 'none', color: "white" }}>
              <AddIcon />
            </Link>
          </Fab>
        }
        {/* "For each" loop through all the users plants here to display CARDS? of each plant*/}
        {this.state.companionPlants.length ? <CompanionInfo companionPlants={this.state.companionPlants} resetCompanionsTable={this.resetCompanionsTable} /> : <></>}
      </div >
    )
  }
}

export default UserPlants;