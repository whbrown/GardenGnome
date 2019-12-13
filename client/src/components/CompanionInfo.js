import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';
import RHSPlantProperty from '../components/RHSPlantProperty';
import PlantCardTitle from './PlantCardTitle';

export default class CompanionInfo extends Component {

  render() {
    const { rhsPlantDetails, matchType } = this.props;
    // console.log('matchType', matchType);

    return (
      <div className="card rounded-edges card-shadow mx-4 my-5 plant-card">
        <PlantCardTitle title="Description"/>
      <div className="card-body d-flex flex-column align-items-center">
        {
          matchType.includes('species') && rhsPlantDetails.details ?
          // <RHSPlantProperty property={rhsPlantDetails.Details.hardiness} title='Hardiness' />
          <div id='hardiness'>
            <h5 className="my-0 text-center">Species Details</h5>
            <ul className="list-group">
              <RHSPlantProperty property={rhsPlantDetails.details} />
            </ul>
          </div> 
        : <></>
        }
        {
          rhsPlantDetails.genus && rhsPlantDetails.genus ?
          // <RHSPlantProperty property={rhsPlantDetails.Details.hardiness} title='Hardiness' />
          <div id='hardiness'>
            <h5 className="my-0 text-center">Genus Details</h5>
            <ul className="list-group">
              <RHSPlantProperty property={rhsPlantDetails.genus} />
            </ul>
          </div> 
        : <></>
        }
      </div>
    </div>
    )
  }
}
