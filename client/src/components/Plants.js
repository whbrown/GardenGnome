import React, { Component } from "react";
import axios from "axios";
import PlantList from "./PlantList";
import PlantSearch from "./PlantSearch";
import PageHeading from './reuse/PageHeading'


class Plants extends Component {
  state = {
    filteredPlants: [],
    searchQuery: ``
    // back to top button
  };

  setFilteredPlants = (plants) => {
    return this.setState({
      filteredPlants: plants
    })
  }

  getPlants = (searchQuery) => {
    console.log('send axios database query', searchQuery);
    // return fetch("/api/plants/" + encodeURIComponent(searchQuery))
    return axios.get("/api/plants/" + encodeURIComponent(searchQuery));
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
        <PageHeading>Find a plant</PageHeading>
        <PlantSearch getPlants={this.getPlants} setQuery={this.setQuery} searchQuery={this.state.searchQuery} setFilteredPlants={this.setFilteredPlants} />
        <PlantList plants={this.state.filteredPlants} />
      </div>
    );
  }
}

export default Plants;
