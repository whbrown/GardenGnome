import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';
import RHSPlantProperty from '../components/RHSPlantProperty';


export default class AdditionalDetails extends Component {

  render() {
    const { rhsPlantDetails, matchType } = this.props;
    console.log('matchType', matchType);

    return (
      <div className="card rounded-edges card-shadow align-self-start mx-4">
        <div className="card-header d-flex justify-content-center">
          <h4 className="card-header-title my-0 text-center font-weight-bold">
            Plant Details
          </h4>
        </div>
      <div className="card-body d-flex flex-column align-items-center">
        {
          matchType.includes('species') && rhsPlantDetails.details ?
          // <RHSPlantProperty property={rhsPlantDetails.Details.hardiness} title='Hardiness' />
          <div id='hardiness'>
            <h5 className="my-0">Species Details</h5>
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
            <h5 className="my-0">Genus Details</h5>
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
