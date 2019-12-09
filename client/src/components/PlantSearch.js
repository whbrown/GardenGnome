import React, { Component } from "react";
import axios from "axios";
import PlantList from "./PlantList";
import SearchBar from "./SearchBar";

class PlantSearch extends Component {
  state = {
    filteredPlants: [],
    searchQuery: ``,
    // back to top button
  };

  setFilteredPlants = (plants) => {
    return this.setState({
      filteredPlants: plants
    })
  }

  // getCurrentPlant = () => 

  getPlants = (searchQuery) => {
    console.log('send axios database query', searchQuery);
    // return fetch("/api/plants/" + encodeURIComponent(searchQuery))
    return axios.get("/api/plants/search/" + encodeURIComponent(searchQuery));
  };

  setQuery = (searchQuery) => {
    const sanitizedInput = searchQuery.replace(/[<>.,/;:+_*&^%$#@!`~{}[\]|\\]/g, '');
    this.setState({
      searchQuery: sanitizedInput
    }, () => console.log(this.state.searchQuery))
  }

  componentDidMount() {
    this.getPlants();
  }

  render() {
    return (
      <div className="plants-container">
        <h2>Find a plant</h2>
        <SearchBar getPlants={this.getPlants} setQuery={this.setQuery} searchQuery={this.state.searchQuery} setFilteredPlants={this.setFilteredPlants}/>
        <PlantList plants={this.state.filteredPlants} setSelectedPlant={this.props.setSelectedPlant} />
      </div>
    );
  }
}

export default PlantSearch;
