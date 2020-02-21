import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheets/plantNeeds.css';
import PlantCardTitle from './PlantCardTitle';

const CommonNames = props => {

    // console.log('sunNeeds props:', this.props)
    const { commonNames } = this.props;
    if (Object.values(commonNames).find((val) => {
      if (Array.isArray(val)) {
        return val.length;
      }
      return val;
    })) {
      return (
        <div className="card rounded-edges card-shadow mx-4 my-5 plant-card">
          <PlantCardTitle title="Common Names" />
        <div className="rounded-edges card-body d-flex flex-column align-items-center rounded-edges">
        <h5 className="my-3 text-center">Soil Type{rhsSoilNeeds.soilTypes.length > 1 && <>s</>}</h5>
          <ul className="rounded-edges list-group">
            {rhsSoilNeeds.soilTypes.map((soilType, index) => {
              return (
                <li key={index} className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5">
                  <span className="soilNeedReq">{soilType}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      )
    }
    return <></>
    
}

export default CommonNames;