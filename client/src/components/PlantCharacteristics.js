import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/plantNeeds.css';


class PlantCharacteristics extends Component {

  

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
    console.log('plantCharacteristics props:', this.props)
    const { dgPlantCharacteristics, rhsPlantCharacteristics } = this.props;

    return (
      <div className="card rounded-edges card-shadow align-self-start mx-4">
        <div className="card-header d-flex justify-content-center">
          <p className="card-header-title my-0 text-center font-weight-bold">
            Characteristics
          </p>
        </div>
      <div className="card-body d-flex flex-column align-items-center">
        {dgPlantCharacteristics.category.length ? 
        <h5 className="my-0">Category</h5>
        <ul className="list-group">
          {dgPlantCharacteristics.length ? dgPlantCharacteristics.category.map((plantCategory, index) => {
            return (
              <li key={index} className="rounded-edges list-group-item d-flex justify-content-center align-items-center my-1 px-5">
                <span className="plantNeedTopic text-center">{plantCategory}
                </span>
              </li>
            )
          }): <></> }
        }
          {rhsPlantCharacteristics.characteristics.habit &&
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="my-3">Habit</h5>
            <ul className="list-group">
              {rhsPlantCharacteristics.characteristics.habit.map((plantHabit, index) => (
                  <li key={index} className="rounded-edges list-group-item d-flex justify-content-between align-items-center text-center my-1 px-5">
                    <span className="sunNeedReq text-center">{plantHabit}</span>
                  </li>))}
            </ul>
          </div>
          }
          {rhsPlantCharacteristics.characteristics.foliage && 
          <div className="rounded-edges d-flex flex-column justify-content-center align-items-center">
            <h5 className="my-3">Foliage</h5>
            <ul className="list-group rounded-edges">
              {rhsPlantCharacteristics.characteristics.foliage.map((plantFoliage, index) => (
                  <li key={index} className="rounded-edges list-group-item d-flex justify-content-between align-items-center text-center my-1 px-5">
                    <span className="sunNeedReq text-center">{plantFoliage}</span>
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

export default PlantColour;