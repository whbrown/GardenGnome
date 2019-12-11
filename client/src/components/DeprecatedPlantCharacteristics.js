import React, { Component } from "react";
import '../stylesheets/plantNeeds.css';
import CharacteristicTopic from './CharacteristicTopic';


class PlantCharacteristics extends Component {
  
  convertCamelCaseToNormal = string => {
    const convertedString = string.split('').reduce((convertedString, letter) => {
      if (/[A-Z]/.test(letter)) {
        return `${convertedString} ${letter.toLowerCase()}`;
      }
      return `${convertedString}${letter}`;
    });
    return convertedString.slice(0, 1).toUpperCase() + convertedString.slice(1);
  };

  componentDidMount() {
    
    const topicTitles = {
      otherCommonNames: 'Other common names',
      plantRange: 'Range',
      plantComments: 'Comments',
      foliageColor: 'Foliage Colour',
      bloomColor: 'Bloom Colour',
      sunExposure: 'Sunlight Requirements',
      plantCommonNames: 'Common names',
      plantLatinName: 'Latin name',
      taxonomicInfo: 'Taxonomic Information',
      plantFamily: 'Family',
      plantGenus: 'Genus',
      plantSpecies: 'Species',
      moistureTypes: 'Moisture',
      phTypes: 'pH Level'
    }
  }

  formatSunNeeds(dgSunNeeds, rhsSunNeeds) {
    return (
      <ul className="list-group">
          {dgSunNeeds.length ? dgSunNeeds.map((sunNeed, index) => {
            return (
              <CharacteristicTopic key={index} sunNeed={sunNeed} />
            )
          }) : rhsSunNeeds.sunNeeds.map((sunNeed, index) => {
            return (
              <CharacteristicTopic key={index} sunNeed={sunNeed} />
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
    )
  }

  render() {
    console.log('plantCharacteristic:', this.props)
    const { dgTopicInfo, rhsTopicInfo, topicTitle } = this.props;
    return (
    <section className="card rounded-edges card-shadow align-self-start mx-4">
      <div className="card-header d-flex justify-content-center">
        <p className="card-header-title my-0 text-center font-weight-bold">
          {topicTitle}
        </p>
      </div>
      <div className="card-body d-flex flex-column align-items-center">
        {/* {
          dgTopicInfo.forEach((topic, index) => {
            return (
              <div key={index}>
                <h5 className="my-0">{topicTitles[dgTopicInfo] ? topicTitles[dgTopicInfo] : convertCamelCaseToNormal(topic)}</h5>
                <ul className="list-group">
                  <CharacteristicTopic topic={topic} />
                </ul>
              </div>
            )
          })
        } */}
      </div>
    </section>
    );
  }
}
export default PlantCharacteristics;