import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from './CharacteristicTopic';
import RHSPlantProperty from './RHSPlantProperty';


export default class PlantCharacteristics extends Component {

  render() {

    const { dgSizeInfo, rhsSizeInfo } = this.props;

    return (
      <div className="card rounded-edges card-shadow align-self-start mx-4">
        <div className="card-header d-flex justify-content-center">
          <p className="card-header-title my-0 text-center font-weight-bold">
            Plant Size
          </p>
        </div>
      <div className="card-body d-flex flex-column align-items-center">
        {dgSizeInfo.height.length ?
        <div id="dg-height">
          <h5 className="my-0 text-center">Height</h5>
          <ul className="list-group">
            {dgSizeInfo.height.map((plantHeight, index) => {
              return <CharacteristicTopic key={index} property={plantHeight} />
            })}
          </ul>
        </div> : <></>
        }
        {dgSizeInfo.spacing.length ?
        <div id="dg-height">
          <h5 className="my-0 text-center">Height</h5>
          <ul className="list-group">
            {dgSizeInfo.spacing.map((plantSpacing, index) => {
              return <CharacteristicTopic key={index} property={plantSpacing} />
            })}
          </ul>
        </div> : <></>
        }
      </div>
    </div>
    )
     }
  }