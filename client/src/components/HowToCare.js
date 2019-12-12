import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';
import RHSPlantProperty from '../components/RHSPlantProperty';


export default class HowToCare extends Component {

  render() {
    console.log('howtocare props', this.props)
    const { howToCare, dgPruningInstructions } = this.props;

    return (
      <div className="card rounded-edges card-shadow align-self-start mx-4">
        <div className="card-header d-flex justify-content-center">
          <h4 className="card-header-title my-0 text-center font-weight-bold">
            How to Care
          </h4>
        </div>
      <div className="card-body d-flex flex-column align-items-center">
        {
          howToCare.pruning ?
          // <RHSPlantProperty property={howToGrow.Details.hardiness} title='Hardiness' />
          <div id='hardiness'>
            <h5 className="my-0">Pruning</h5>
            <ul className="list-group">
              <RHSPlantProperty property={howToCare.pruning} />
              {dgPruningInstructions.length ? dgPruningInstructions.map((prop, index) => {
                return <CharacteristicTopic key={index} property={prop} />
              }) : <></>}
            </ul>
          </div> 
        : <></>
        }
        {
          howToCare.diseases ?
          // <RHSPlantProperty property={howToGrow.Details.hardiness} title='Hardiness' />
          <div id='hardiness'>
            <h5 className="my-0">Diseases</h5>
            <ul className="list-group">
              <RHSPlantProperty property={howToCare.diseases} />
            </ul>
          </div> 
        : <></>
        }
        {
          howToCare.pestsDescription ?
          // <RHSPlantProperty property={howToGrow.Details.hardiness} title='Hardiness' />
          <div id='hardiness'>
            <h5 className="my-0">Pests</h5>
            <ul className="list-group">
              <RHSPlantProperty property={howToCare.pestsDescription} />
            </ul>
          </div> 
        : <></>
        }
      </div>
    </div>
    )
  }
}
