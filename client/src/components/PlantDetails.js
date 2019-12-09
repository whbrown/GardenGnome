import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import PageHeading from '../components/reuse/PageHeading';
import H3 from '../components/reuse/H3';
import PlantCard from '../components/reuse/PlantCard';
import BackButton from './reuse/BackButton'

export default class PlantDetails extends Component {

  state = {
    selectedPlantInfo: {
      rhsInfo: {},
      dgInfo: {}
    }
  }

  handleClick = () => {
    this.props.history.goBack()
  }

  async componentWillMount() {
    await axios.get(`../api/plants/search/id=${this.props.selectedPlant._id}&latinName=${this.props.selectedPlant.plantLatinName}`).then((res) => {
      // console.log(res.data);
      const selectedPlantInfo = {
        rhsInfo: res.data.rhsInfo,
        dgInfo: res.data.dgInfo
      }
      this.setState({
        selectedPlantInfo: selectedPlantInfo
      })
    });
    // if (this.props.selectedPlant._id) {
    //   const selectedPlant = await axios.get("/api/plants/details/" + encodeURIComponent(this.props.selectedPlant._id))
    // }
  }

  render() {
    // console.log(this.props)
    // console.log('this.state:', this.state);
    return (
      <div>
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <PageHeading>Details</PageHeading>
        <PlantCard>
          <div>
            {/* <H3>{'test'}</H3> */}
            <code>
              {JSON.stringify(this.state.selectedPlantInfo.rhsInfo)}
            </code>
            <br />
            <code>
              {JSON.stringify(this.state.selectedPlantInfo.dgInfo)}
            </code>
            {/* {[this.state.selectedPlantInfo.rhsInfo, this.state.selectedPlantInfo.dgInfo]} */}
          </div>
        </PlantCard>
      </div>
    )
  }




}
