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

export default class PlantDetails extends Component {

  handleClick = () => {
    this.props.history.goBack();
  }

  async componentWillMount() {
    // change to use props.match instead of state
    console.log('PlantDetails.props.match.params', this.props.match.params)
    const { id, latinName } = this.props.match.params;
    await axios.get(`../api/plants/search/id=${id}&latinName=${latinName}`).then((res) => {
      console.log(res.data);
      const selectedPlantInfo = {
        rhsInfo: res.data.rhsInfo,
        dgInfo: res.data.dgInfo
      }
      return this.props.setSelectedPlantInfo(selectedPlantInfo);
    });
    // if (this.props.selectedPlant._id) {
    //   const selectedPlant = await axios.get("/api/plants/details/" + encodeURIComponent(this.props.selectedPlant._id))
    // }
  }

  render() {
    // console.log(this.props)
    // console.log('this.state:', this.state);
    const { dgInfo, rhsInfo } = this.props.selectedPlantInfo;

    return (
      <DetailsContainer>
          <BackButton src='../../assets/back-arrow.svg' alt="back-arrow" onClick={this.handleClick} />
          <PageHeading>{dgInfo.plantLatinName}</PageHeading>
          {dgInfo.plantLatinName ?
          <PlantCard>
              <Carousel images={[dgInfo.plantImageURL].concat(dgInfo.additionalPhotos.map((photo) => photo.replace(/_tn\.jpg/, '.jpg')))} />
              <WaterNeeds waterRequirements={dgInfo.waterRequirements} genus={dgInfo.taxonomicInfo.plantGenus.match(/\w+/)[0]}/>
          
              <PlantDetail>
                {JSON.stringify(rhsInfo)}
              </PlantDetail>
              <PlantDetail>
                {JSON.stringify(dgInfo)}
              </PlantDetail>
          </PlantCard> : <H4>Loading ...</H4>}
      </DetailsContainer>
    )
  }
}
