import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from "axios";
import './App.css';

// REACT COMPONENTS:
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import UserGarden from "./components/UserGarden";
import Gnomes from "./components/Gnomes";
import PlantSearch from "./components/PlantSearch";
import PlantDetails from "./components/PlantDetails"
import UserPlants from "./components/UserPlants"
import UserComments from "./components/UserComments"
import UserWishlist from "./components/UserWishlist"

// MAKING PUBLIC FOLDER STATIC?
// const express = require("express");
// const path = require("path");
// const app = express();
// app.use(express.static(path.join(__dirname, "public")));

class App extends Component {
  state = {
    user: this.props.user,
    targetUser: {},
    filteredPlants: [],
    searchQuery: ``,
    selectedPlant: {
      _id: null,
      plantLatinName: '',
      plantCommonNames: [],
      plantImageURL: '',
      sunExposure: [],
      waterRequirements: [],
      taxonomicInfo: {
        plantFamily: '',
        plantGenus: '',
        plantSpecies: '',
      }
    }
  };

  setFilteredPlants = (plants) => {
    return this.setState({
      filteredPlants: plants
    })
  }

  setQuery = (searchQuery) => {
    const sanitizedInput = searchQuery.replace(/[<>.,/;:+_*&^%$#@!`~{}[\]|\\]/g, '');
    this.setState({
      searchQuery: sanitizedInput
    }, () => console.log(this.state.searchQuery))
  }

  setUser = user => {
    this.setState({
      user: user
    });
  };

  setTargetUser = user => {
    this.setState({
      targetUser: user
    })
  }

  setSelectedPlant = (plant) => {
    const selectedPlant = {
      _id: plant._id,
      plantLatinName: plant.plantLatinName,
      plantCommonNames: plant.plantCommonNames,
      plantImageURL: plant.plantImageURL,
      sunExposure: plant.sunExposure,
      waterRequirements: plant.waterRequirements,
      taxonomicInfo: {
        plantFamily: plant.taxonomicInfo.plantFamily,
        plantGenus: plant.taxonomicInfo.plantGenus,
        plantSpecies: plant.taxonomicInfo.plantSpecies,
      }
    }
    this.setState({
      selectedPlant: { ...selectedPlant }
    }, () => console.log(this.state));
  }

  render() {
    console.log('appjs state', this.state);
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={props => <Homepage {...props} user={this.state.user} setUser={this.setUser} />} />
          <Route exact path="/login"
            render={props => <Login {...props} user={this.state.user} setUser={this.setUser} />} />
          <Route exact path="/signup"
            render={props => <Signup {...props} setUser={this.setUser} />} />
          <Route exact path="/user/:id/plants"
            // OPTION FOR SEXIER CODE: Set a state property where you trigger to render a choice of the 3 children of UserGarden
            render={props => (
              <UserGarden {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} user={this.state.user}>
                <UserPlants {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} />
              </UserGarden>
            )} />
          <Route exact path="/user/:id/comments"
            render={props => (
              <UserGarden {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} >
                <UserComments {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} />
              </UserGarden>
            )} />
          <Route exact path="/user/:id/wishlist"
            render={props => (
              <UserGarden {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} >
                <UserWishlist {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} />
              </UserGarden>
            )} />
          <Route path="/gnomes"
            render={props => <Gnomes {...props} user={this.state.user} setUser={this.setUser} />} />
          <Route exact path="/plants/search"
            render={props => <PlantSearch {...props} setQuery={this.setQuery} searchQuery={this.state.searchQuery} setFilteredPlants={this.setFilteredPlants} filteredPlants={this.state.filteredPlants} setSelectedPlant={this.setSelectedPlant} />} />
          <Route exact path="/plants/:id" render={props => <PlantDetails {...props} selectedPlant={this.state.selectedPlant} />} />
        </Switch>

        {/* NavBar Below */}
        <Route path="/"
          render={props => <Navbar {...props} user={this.state.user} setUser={this.setUser} />} />
      </div>
    );
  }
}

export default App;