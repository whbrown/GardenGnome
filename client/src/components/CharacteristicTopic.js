import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/plantNeeds.css';


class CharacteristicTopic extends Component {


  render() {
    if (this.props.sunNeed) {
      const { sunNeed } = this.props;
      return (
        <li className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5">
          <span className="plant-characteristic">{sunNeed}</span>
          {this.props.sunPairIcon({sunNeed})}
        </li>
      )
    } else {
      const { property } = this.props;
      return (
        <li className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5">
          <span className="plant-characteristic">{property}</span>
        </li>
      )
    }
  }
}

export default CharacteristicTopic;