import React, { Component } from "react";
import axios from "axios";
// import PlantList from "./PlantList";
import PlantSearch from "./PlantSearch";

class Plants extends Component {
  state = {
    filteredPlants: [],
    searchQuery: ""
    // back to top button
  };

  // componentWillUnmount() {
  //   console.log("PROJECTS UNMOUNT");
  // }

  getPlants = (searchQuery) => {
    // axios
    //   .get("http://localhost:5555/api/projects")
    console.log('send database query', searchQuery);
    axios
      .get("/api/plants/" + searchQuery)
      .then(response => {
        console.log(response.data)
        this.setState({
          filteredPlants: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  newQuery = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery
    })
  }

  componentDidMount() {
    this.getPlants();
  }

  render() {
    console.log(this.filteredPlants)
    return (
      <div className="plants-container">
        <h2>Find a plant</h2>
        {/* <PlantList projects={this.state.plants} /> */}
        <PlantSearch getPlants={this.getPlants} newQuery={this.newQuery} searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

export default Plants;
