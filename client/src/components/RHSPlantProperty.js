import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';

const RHSPlantProperty = props => {
  return props.property ?
    <div id={props.property.toLowerCase()}>
      {props.title ? <h5 className="my-0">{props.title}</h5> : <></>}
      <ul className="list-group ">
        <li className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5 plant-characteristic">{props.property}</li>
      </ul>
    </div> : <></>
}  

export default RHSPlantProperty;
