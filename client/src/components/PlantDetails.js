import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import H2 from '../components/reuse/H2';
import H3 from '../components/reuse/H3';
import PlantCard from '../components/reuse/PlantCard';

export default class PlantDetails extends Component {


  async componentWillMount() {
    await this.props;
    // if (this.props.selectedPlant._id) {
    //   const selectedPlant = await axios.get("/api/plants/details/" + encodeURIComponent(this.props.selectedPlant._id))
    // }
  }

  render() {
    console.log(this.props)


    return (
      <div>
        <Link to={`/plants/search`}>Back</Link>
        <H2>Details</H2>
        <PlantCard>
          <div>
    <H3>{'test'}</H3>
          </div>
        </PlantCard>
      </div>
    )
  }




}
