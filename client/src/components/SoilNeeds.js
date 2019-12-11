import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheets/plantNeeds.css';
class SoilNeeds extends Component {



  render() {
    console.log('sunNeeds props:', this.props)
    const { rhsSoilNeeds } = this.props;
    return (
      <div className="card card-shadow rounded-edges">
        <div className="card-header rounded-edges d-flex justify-content-center align-items-center">
          <p className="card-header-title rounded-edges text-center font-weight-bold">
            Soil Requirements
          </p>
        </div>
      <div className="rounded-edges card-body d-flex flex-column align-items-center rounded-edges">
      <h5 className="my-3">Soil Type{rhsSoilNeeds.soilTypes.length > 1 && <>s</>}</h5>
        <ul className="rounded-edges list-group">
          {rhsSoilNeeds.soilTypes.map((soilType, index) => {
            return (
              <li key={index} className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5">
                <span className="soilNeedReq">{soilType}
                </span>
              </li>
            )
          })}
          {rhsSoilNeeds.moistureTypes &&
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="my-3">Moisture</h5>
            <ul className="list-group">
              {rhsSoilNeeds.moistureTypes.map((moisture, index) => (
                  <li key={index} className="rounded-edges list-group-item d-flex justify-content-between align-items-center text-center my-1 px-5">
                    <span className="soilNeedReq">{moisture}</span>
                  </li>))}
            </ul>
          </div>
          }
          {rhsSoilNeeds.exposure && 
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="my-3">Exposure</h5>
            <ul className="list-group">
              {rhsSoilNeeds.exposure.map((exposure, index) => (
                <li key={index} className="rounded-edges list-group-item d-flex justify-content-between align-items-center text-center my-1 px-5">
                  <span className="soilNeedReq">{exposure}</span>
                </li>))}
            </ul>
          </div>
          }
          {rhsSoilNeeds.phTypes && 
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h5 className="my-3">pH Level{rhsSoilNeeds.phTypes.length > 1 && <>s</>}</h5>
              <ul className="list-group">
                {rhsSoilNeeds.phTypes.map((phType, index) => (
                  <li key={index} className="rounded-edges list-group-item d-flex justify-content-between align-items-center text-center my-1 px-5">
                    <span className="soilNeedReq">{phType}</span>
                  </li>))}
              </ul>
            </div>
          }
        </ul>
      </div>
    </div>
    )
  }
}

export default SoilNeeds;