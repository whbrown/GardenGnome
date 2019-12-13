import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import PageHeading from '../components/reuse/PageHeading';
import H3 from '../components/reuse/H3';
import H4 from '../components/reuse/H4';
import PlantCard from '../components/reuse/PlantCard';
import BackButton from '../components/reuse/BackButton';
import DetailsContainer from '../components/reuse/DetailsContainer';
import PlantDetail from '../components/reuse/PlantDetail';
import Carousel from '../components/Carousel';
import WaterNeeds from '../components/WaterNeeds';
import SunNeeds from '../components/SunNeeds';
import SoilNeeds from '../components/SoilNeeds';
import PlantCharacteristics from '../components/PlantCharacteristics';
import PlantColour from '../components/PlantColour';
import AdditionalDetails from '../components/AdditionalDetails';
import HowToCare from "./HowToCare";
import HowToGrow from "./HowToGrow";
import '../stylesheets/plantNeeds.css';

export default class PlantDetails extends Component {

  handleClick = () => {
    this.props.history.goBack();
  }

  async componentDidMount() {
    // change to use props.match instead of state
    console.log('PlantDetails.props.match.params', this.props.match.params)
    const { id, latinName } = this.props.match.params;
    await axios.get(`../api/plants/search/id=${id}&latinName=${latinName}`).then((res) => {
      console.log('waterneeds res: ', res.data)
      const selectedPlantInfo = {
        rhsInfo: res.data.rhsInfo,
        dgInfo: res.data.dgInfo,
        matchType: res.data.matchType
      }
      console.log('selectedPlantInfo', selectedPlantInfo);
      return this.props.setSelectedPlantInfo(selectedPlantInfo);
    });
    // if (this.props.selectedPlant._id) {
    //   const selectedPlant = await axios.get("/api/plants/details/" + encodeURIComponent(this.props.selectedPlant._id))
    // }
  }

  render() {
    console.log('plant details props', this.props)
    // console.log('this.state:', this.state);
    const { dgInfo, rhsInfo, matchType } = this.props.selectedPlantInfo;

    return (
      <DetailsContainer>
          <BackButton src='../../assets/back-arrow.svg' alt="back-arrow" onClick={this.handleClick} />
          <PageHeading>{dgInfo.plantLatinName}</PageHeading>
          {dgInfo.plantLatinName ?
          <PlantCard>
              <Carousel images={[dgInfo.plantImageURL].concat(dgInfo.additionalPhotos.map((photo) => photo.replace(/_tn\.jpg/, '.jpg')))} />
            <div className="plant-info-container">
              {matchType.includes('genus') ? <AdditionalDetails rhsPlantDetails={rhsInfo.furtherDetails} matchType={matchType} /> : <></>}
              <WaterNeeds waterRequirements={dgInfo.waterRequirements} genus={dgInfo.taxonomicInfo.plantGenus.match(/\w+/)[0]} moistureTypes={rhsInfo.soil.moistureTypes}/>
              <SunNeeds dgSunNeeds={dgInfo.sunExposure} rhsSunNeeds={rhsInfo.sunlight}/>
              <SoilNeeds rhsSoilNeeds={rhsInfo.soil}/>
              <PlantCharacteristics dgPlantCharacteristics={dgInfo} rhsPlantCharacteristics={rhsInfo} />
              <PlantColour rhsColours={rhsInfo.colour} dgColours={{bloomColour: dgInfo.bloomColor, foliageColour: dgInfo.foliageColor, bloomTime: dgInfo.bloomTime, bloomShape: dgInfo.bloomShape, bloomSize: dgInfo.bloomSize }} />
              {matchType.includes('genus') ? <HowToCare dgPruningInstructions={dgInfo.pruningInstructions} howToCare={{...rhsInfo.howToCare}}/> : <></>}
              <HowToGrow dgPropagation={dgInfo.propagationMethods} howToGrow={{...rhsInfo.howToGrow}}/>
              </div>
          </PlantCard> : <H4>Loading ...</H4>}
      </DetailsContainer>
    )
  }
}
