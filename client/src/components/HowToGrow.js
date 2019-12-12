import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';
import RHSPlantProperty from '../components/RHSPlantProperty';


export default class HowToGrow extends Component {

  render() {
    const { howToGrow, dgPropagation } = this.props;

    return (
      <div className="card rounded-edges card-shadow align-self-start mx-4">
        <div className="card-header d-flex justify-content-center">
          <h4 className="card-header-title my-0 text-center font-weight-bold">
            How to Grow
          </h4>
        </div>
      <div className="card-body d-flex flex-column align-items-center">
        {
          howToGrow.cultivation ?
          <div id='hardiness'>
            <h5 className="my-0">Cultivation</h5>
            <ul className="list-group">
              <RHSPlantProperty property={howToGrow.cultivation} />
            </ul>
          </div> 
        : <></>
        }
        {
          howToGrow.propagation ?
          <div id='hardiness'>
            <h5 className="my-0">Propagation</h5>
            <ul className="list-group">
              <RHSPlantProperty property={howToGrow.propagation} />
              
              {dgPropagation.length ? <><h4>Methods list</h4>{dgPropagation.map((prop, index) => {
                return <CharacteristicTopic key={index} property={prop} />
              })}</> : <></>}
            </ul>
          </div> 
        : <></>
        }
        {
          howToGrow.plantingLocation ?
          <div id='hardiness'>
            <h5 className="my-0">Planting Location</h5>
            <ul className="list-group">
              <RHSPlantProperty property={howToGrow.plantingLocation} />
            </ul>
          </div> 
        : <></>
        }
      </div>
    </div>
    )
  }
}
