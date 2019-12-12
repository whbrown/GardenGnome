import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from '../components/CharacteristicTopic';
import RHSPlantProperty from '../components/RHSPlantProperty';
import PlantCardTitle from './PlantCardTitle';


export default class PlantCharacteristics extends Component {

  render() {
    // console.log('plantCharacteristics props:', this.props)
    const { dgPlantCharacteristics, rhsPlantCharacteristics } = this.props;

    return (
      <div className="card rounded-edges card-shadow align-self-start mx-4">
        <PlantCardTitle title="Plant Characteristics"/>
      <div className="card-body d-flex flex-column align-items-center">
        {dgPlantCharacteristics.class.length ?
        <div id="class">
          <h5 className="my-0">Class</h5>
          <ul className="list-group">
            {dgPlantCharacteristics.class.map((plantClass, index) => {
              return <CharacteristicTopic key={index} property={plantClass} />
            })}
          </ul>
        </div> : <></>
        }
        {/* {dgPlantCharacteristics.category.length ?
        <div id='category'>
          <h5 className="my-0">Class</h5>
          <ul className="list-group">
            {dgPlantCharacteristics.class.map((plantClass, index) => {
              return <CharacteristicTopic key={index} property={plantClass} />
            })}
          </ul>
        </div> : <></>
        } */}
        {dgPlantCharacteristics.category.length ?
        <div id='category'>
          <h5 className="my-0">Category</h5>
          <ul className="list-group">
            {dgPlantCharacteristics.category.map((plantClass, index) => {
              return <CharacteristicTopic key={index} property={plantClass} />
            })}
          </ul>
        </div> : <></>
        }
        {rhsPlantCharacteristics.characteristics.habit ?
        // <RHSPlantProperty property={rhsPlantCharacteristics.habit} />
        <div id='habit'>
          <h5 className="my-0">Habit</h5>
          <ul className="list-group">
            <CharacteristicTopic property={rhsPlantCharacteristics.characteristics.habit} />
          </ul>
        </div> 
        : <></>
        }
        {dgPlantCharacteristics.otherDetails.length ?
        <div id='otherDetails'>
          <h5 className="my-0">Other details</h5>
          <ul className="list-group">
            {dgPlantCharacteristics.otherDetails.map((detail, index) => {
              return <CharacteristicTopic key={index} property={detail} />
            })}
          </ul>
        </div> : <></>}
        {dgPlantCharacteristics.danger.length ?
        <div id='danger'>
          <h5 className="my-0">Danger</h5>
          <ul className="list-group">
            {dgPlantCharacteristics.danger.map((plantDanger, index) => {
              return <CharacteristicTopic key={index} property={plantDanger} />
            })}
          </ul>
        </div> : <></>}
        {rhsPlantCharacteristics.characteristics.toxicity ?
        // <RHSPlantProperty property={rhsPlantCharacteristics.toxicity} />
        <div id='toxicity'>
          <h5 className="my-0">Toxicity</h5>
          <ul className="list-group">
            <CharacteristicTopic property={rhsPlantCharacteristics.characteristics.toxicity} />
          </ul>
        </div> 
        : <></>}
        {
          rhsPlantCharacteristics.characteristics.hardiness ?
          // <RHSPlantProperty property={rhsPlantCharacteristics.characteristics.hardiness} title='Hardiness' />
          <div id='hardiness'>
            <h5 className="my-0">Hardiness</h5>
            <ul className="list-group">
              <CharacteristicTopic property={rhsPlantCharacteristics.characteristics.hardiness} />
            </ul>
          </div> 
        : <></>
        }
        {
          // TODO: limit to only species matches
          rhsPlantCharacteristics.characteristics.fragrance ?
          // <RHSPlantProperty property={rhsPlantCharacteristics.characteristics.fragrance} title='Fragrance' />
          <div id='fragrance'>
            <h5 className="my-0">Fragrance</h5>
            <ul className="list-group">
              <CharacteristicTopic property={rhsPlantCharacteristics.characteristics.fragrance} />
            </ul>
          </div> 
        : <></>
        }
      </div>
    </div>
    )
  }
}

// export default plantCharacteristics;