import React, { Component } from "react";
import axios from "axios";
import PlantList from "./PlantList";
import SearchBar from "./SearchBar";
import BackButton from './reuse/BackButton'

class PlantSearch extends Component {

  handleClick = () => {
    this.props.history.goBack()
  }

  getPlants = (searchQuery) => {
    console.log('send axios database query', searchQuery);
    // return fetch("/api/plants/" + encodeURIComponent(searchQuery))
    return axios.get("/api/plants/search/" + encodeURIComponent(searchQuery));
  };

  componentDidMount() {
    this.getPlants();
  }

  render() {
    // console.log('plantSearch props', this.props);
    return (
      <div className="plants-container">
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <h2>Find a plant</h2>
        <SearchBar getPlants={this.getPlants} setQuery={this.props.setQuery} searchQuery={this.props.searchQuery} setFilteredPlants={this.props.setFilteredPlants}/>
        <PlantList filteredPlants={this.props.filteredPlants} />
      </div >
    );
  }
}

export default PlantSearch;
