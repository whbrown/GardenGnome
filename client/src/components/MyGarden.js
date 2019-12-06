import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from 'axios'


class MyGarden extends Component {

  renderMyGarden = () => {
    axios
      .get('/api/plants/mygarden')
      .then(response => {
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
      <div>
        <h2>My Garden</h2>
        {this.props.user.garden.map(plant => {
          /* Placeholder names until users can be populated with actual plants. Key should also be updated to ID when ready */
          console.log("IDENTIFY THE PLANT ATTRIBUTES: ", plant.plantId)
          // Avoids the initial render error where user's plantId is NULL and throws an error
          return (plant.plantId && (
            <div key={plant._id}>
              <h4> {plant.name}</h4>
              <h3>{plant.plantId.plantCommonName}</h3>
              <img src={plant.plantId.plantImageURL} alt="" />
            </div>)
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