import React, { Component } from "react";
import { Link } from "react-router-dom";

class MyGarden extends Component {

  render() {
    console.log(this.props.user)
    return (
      <div>
        <h2>My Garden</h2>
        {this.props.user.garden.map(plant => {
          console.log(plant)
          {/* Placeholder names until users can be populated with actual plants. Key should also be updated to ID when ready */ }
          return (
            <h4 key={plant}>{plant}</h4>
          )
        })}
        {/* "For each" loop through all the users plants here to display CARDS? of each plant*/}
      </div>
    )
  }
}

export default MyGarden;