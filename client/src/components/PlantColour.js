import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';
import RHSPlantProperty from '../components/RHSPlantProperty';
import convertCamelCaseToNormal from '../convertCamelCaseToNormal';
import PlantCardTitle from './PlantCardTitle';


export default class PlantColour extends Component {
  
  formatRHSColours = (season) => {
    let count = 0;
    const { rhsColours } = this.props;
    const colorsByType = ['Foliage', 'Fruit', 'Flower'].map((type, index) => {
      if (rhsColours[season][type.toLowerCase()].length) {
        // console.log(type);
      return <><h6>{type}</h6><ul className="list-group">{rhsColours[season][type.toLowerCase()].map((colour) => {
        count++;
        return <li className="rounded-edges list-group-item">{colour}</li>
      })}</ul></>
      } else {
        return <></>
      }
    })
    if (count > 0) {
      return colorsByType;
    } else {
      return <li className="rounded-edges list-group-item">None</li>
    }
  }


  render() {
    // console.log('plantCharacteristics props:', this.props)
    const { dgColours, rhsColours } = this.props;
    // console.log('rhsColours', rhsColours);

    return (
    <div className="card rounded-edges card-shadow mx-4 my-5 plant-card">
      <PlantCardTitle title="Colour"/>
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