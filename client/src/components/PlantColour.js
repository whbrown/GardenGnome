import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';
import RHSPlantProperty from '../components/RHSPlantProperty';
import convertCamelCaseToNormal from '../convertCamelCaseToNormal';


export default class PlantColour extends Component {
  
  formatRHSColours = (season) => {
    console.log(season);
    const { rhsColours } = this.props;
    return ['Foliage', 'Fruit', 'Flower'].map((type, index) => {
      if (rhsColours[season][type.toLowerCase()].length) {
        console.log(type);
      return <><h6>{type}</h6><ul>{rhsColours[season][type.toLowerCase()].map((colour) => <li>{colour}</li>)}</ul></>
      } else {
        return <></>
      }
    })
    
  }


  render() {
    console.log('plantCharacteristics props:', this.props)
    const { dgColours, rhsColours } = this.props;
    // console.log('rhsColours', rhsColours);

    return (
    <div className="card rounded-edges card-shadow align-self-start mx-4">
      <div className="card-header d-flex justify-content-center">
        <p className="card-header-title my-0 text-center font-weight-bold">
          Colour
        </p>
      </div>
      <div className="card-body d-flex flex-column align-items-center">
        {Object.values(dgColours).length ? 
        <div>
          <ul>
            {Object.keys(dgColours).map((colourProp, index) => {
              if (dgColours[colourProp].length) {
                return (<div id={convertCamelCaseToNormal(colourProp)}>
              <h5 className="my-0">{convertCamelCaseToNormal(colourProp)}</h5>
                <ul className="list-group">
                  {dgColours[colourProp].map((prop, index) => {
                    return <CharacteristicTopic key={index} property={prop} />
                  })}
                </ul>
              </div>)
              } else {
                return <></>
              }
            })}
          </ul>
        </div>        
        : <></>
      }
        <div>
          <h4>By Season</h4>
      {Object.keys(rhsColours).map((season) => <ul><h4>{season}</h4>{this.formatRHSColours(season)}</ul>)}
        </div>
      </div>
    </div>
    );
  }
}

// export default plantCharacteristics;