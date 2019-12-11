import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/plantNeeds.css';


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

  componentDidMount() {


    // const { dgSunNeeds, rhsSunNeeds } = this.props;
    // let sunIcon = <FontAwesomeIcon icon={faSun}/>;
    // if (dgSunNeeds.length) {
    //   if (dgSunNeeds[0] === "Full Sun") {
    //     sunIcon = <FontAwesomeIcon icon={faSun}/>;
    //   } else if (dgSunNeeds[0] === "Sun to Partial Shade" || dgSunNeeds[0] ===
    //   "Light Shade") {
    //     sunIcon = <FontAwesomeIcon icon={faCloudSun}/>
    //   } else {
    //     sunIcon = <FontAwesomeIcon icon={faCloud}/>
    //   }
    // } else if (rhsSunNeeds.length) {
    //   if (rhsSunNeeds.sunNeeds[0] === "Partial Shade") {
    //     sunIcon = <FontAwesomeIcon icon={faCloudSun}/>;
    //   } else if (rhsSunNeeds.sunNeeds[0] === "Full Shade") {
    //     sunIcon = <FontAwesomeIcon icon={faCloud}/>;
    //   }
    // }
    // this.setState({
    //   sunIcon: sunIcon,
    // })
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
              <li key={index} className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5">
                <span className="sunExposureReq">{sunNeed}
                </span>
                {this.pairIcon({sunNeed})}
              </li>
            )
          }): rhsSunNeeds.sunNeeds.map((sunNeed, index) => {
            return (
              <li key={index} className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5">
                <span className="sunExposureReq">{sunNeed} {this.pairIcon({sunNeed})}</span>
              </li>
            )
          })}
          {rhsSunNeeds.aspect &&
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="my-3">Aspect</h5>
            <ul className="list-group">
              {rhsSunNeeds.aspect.map((aspect, index) => (
                  <li key={index} className="rounded-edges list-group-item d-flex justify-content-between align-items-center text-center my-1 px-5">
                    <span className="sunNeedReq">{aspect}</span>
                  </li>))}
            </ul>
          </div>
          }
          {rhsSunNeeds.exposure && 
          <div className="rounded-edges d-flex flex-column justify-content-center align-items-center">
            <h5 className="my-3">Exposure</h5>
            <ul className="list-group rounded-edges">
              {rhsSunNeeds.exposure.map((exposure, index) => (
                  <li key={index} className="rounded-edges list-group-item d-flex justify-content-between align-items-center text-center my-1 px-5">
                    <span className="sunNeedReq">{exposure}</span>
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

export default SunNeeds;