import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';

const RHSPlantProperty = props => {
  console.log('rhsplantproperties:', this.props);
  return props.property ?
    <div id={props.property.toLowerCase()}>
      <h5 className="my-0">{this.props.title}</h5>
      <ul className="list-group">
        <CharacteristicTopic property={props.property} />
      </ul>
    </div> : <></>
}  

export default RHSPlantProperty;
