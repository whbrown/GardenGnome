import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';


class SunNeeds extends Component {

  pairIcon(sunRequirement) {
    switch (sunRequirement) {
      case ("Full Sun" || "Sun to Partial Shade"):
        return <FontAwesomeIcon icon={faSun}/>;
      case ("Partial Shade" || "Light Shade" || "Partial to Full Shade"):
        return <FontAwesomeIcon icon={faCloudSun}/>;
      case ("Full Shade"):
        return <FontAwesomeIcon icon={faCloud}/>;
      default:
        return <FontAwesomeIcon icon={faSun}/>;
    }
  }

  render() {
    console.log('sunNeeds props:', this.props)
    const { dgSunNeeds, rhsSunNeeds } = this.props;

    return (
      <div className="card rounded-edges card-shadow align-self-start mx-4">
        <div className="card-header d-flex justify-content-center">
          <p className="card-header-title my-0 text-center font-weight-bold">
            Sunlight Requirements
          </p>
        </div>
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="my-0">Sun Needs</h5>
        <ul className="list-group">
          {dgSunNeeds.length ? dgSunNeeds.map((sunNeed, index) => {
            return (
              <CharacteristicTopic index={index} sunNeed={sunNeed} sunPairIcon={this.pairIcon} />
              // <li key={index} className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5">
              //   <span className="sunExposureReq">{sunNeed}
              //   </span>
              //   {this.pairIcon({sunNeed})}
              // </li>
            )
          }) : rhsSunNeeds.sunNeeds.map((sunNeed, index) => {
            return (
              <CharacteristicTopic index={index} sunNeed={sunNeed} sunPairIcon={this.pairIcon} />
            )
          })}
          {rhsSunNeeds.aspect &&
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="my-3">Aspect</h5>
            <ul className="list-group">
              {rhsSunNeeds.aspect.map((aspect, index) => (
                  <CharacteristicTopic index={index} property={aspect} />
                ))}
            </ul>
          </div>
          }
          {rhsSunNeeds.exposure && 
          <div className="rounded-edges d-flex flex-column justify-content-center align-items-center">
            <h5 className="my-3">Exposure</h5>
            <ul className="list-group rounded-edges">
              {rhsSunNeeds.exposure.map((exposure, index) => (
                  <CharacteristicTopic key={index} property={exposure} />
                ))}
            </ul>
          </div>
          }
          
        </ul>
      </div>
    </div>
    )
  }
}

export default SunNeeds;