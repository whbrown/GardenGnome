import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';

const RHSPlantProperty = props => {
  return props.property ?
    <div id={props.property.toLowerCase()}>
      {props.title ? <h5 className="my-1">{props.title}</h5> : <></>}
      <ul className="list-group my-1">
        <li className="rounded-edges list-group-item d-flex plant-characteristic">{props.property}</li>
      </ul>
    </div> : <></>
}  

export default RHSPlantProperty;
