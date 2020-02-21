import React, { Component } from "react";
import axios from "axios";
import PlantList from "./PlantList";
import SearchBar from "./SearchBar";
import BackButton from './reuse/BackButton';
import PageHeading from './reuse/PageHeading'

class PlantSearch extends Component {

  handleClick = () => {
    this.props.history.goBack()
  }

  getPlants = (searchQuery) => {
    // return fetch("/api/plants/" + encodeURIComponent(searchQuery))
    if (searchQuery) {
      console.log('send axios database query', searchQuery);
      return axios.get("/api/plants/search/" + encodeURIComponent(searchQuery));
    }
  };
  
  componentDidMount() {
    this.getPlants();
  }

  render() {
    // console.log('plantSearch props', this.props);
    return (
      <div className="plants-container container" style={{ marginBottom: "80px", padding: "1rem" }} className="fadeIn">
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <div style={{ display: "flex" }}>
          <img src="../../assets/search.svg" alt="my garden" style={{ height: "30px", width: "30px", objectFit: "contain", margin: "5px 10px" }} />
          <PageHeading textAlign="left" margin="(65px 0 0 0)">Find a plant</PageHeading>
        </div>
        <SearchBar getPlants={this.getPlants} setQuery={this.props.setQuery} searchQuery={this.props.searchQuery} setFilteredPlants={this.props.setFilteredPlants} className="row" />
        <PlantList filteredPlants={this.props.filteredPlants} setUser={this.props.setUser} className="row" />
      </div >
    );
  }
}

export default PlantSearch;
