import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MyGarden from "./components/MyGarden";
import Gnomes from "./components/Gnomes";
import PlantSearch from "./components/PlantSearch";
import PlantDetails from "./components/PlantDetails"
import {ThemeProvider} from 'styled-components';
import theme from './components/reuse/theme';
import axios from "axios";

// MAKING PUBLIC FOLDER STATIC?
// const express = require("express");
// const path = require("path");
// const app = express();
// app.use(express.static(path.join(__dirname, "public")));

class App extends Component {
  state = {
    user: this.props.user,
    filteredPlants: [],
    searchQuery: ``,
    selectedPlantInfo: {
      rhsInfo: {},
      dgInfo: {}
    }
  }

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
  }

  setSelectedPlantInfo = (selectedPlantInfo) => {
    return this.setState({
      selectedPlantInfo: selectedPlantInfo,
    });
  }

  render() {
    console.log('appjs state', this.state);
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route exact path="/" render={props => <Homepage {...props} user={this.state.user} setUser={this.setUser} />} />
            <Route exact path="/login"
              render={props => <Login {...props} setUser={this.setUser} />} />
            <Route exact path="/signup"
              // component={Signup}
              render={props => <Signup {...props} setUser={this.setUser} />} />
            <Route path="/mygarden"
              render={props => <MyGarden {...props} user={this.state.user} setUser={this.setUser} />} />
            <Route path="/gnomes"
              render={props => <Gnomes {...props} user={this.state.user} setUser={this.setUser} />} />
            <Route exact path="/plants/search"
              render={props => <PlantSearch {...props} setQuery={this.setQuery} searchQuery={this.state.searchQuery} setFilteredPlants={this.setFilteredPlants} filteredPlants={this.state.filteredPlants} />} />
            <Route exact path="/plants/id=:id&latinName=:latinName" render={props => <PlantDetails {...props} selectedPlantInfo={this.state.selectedPlantInfo} setSelectedPlantInfo={this.setSelectedPlantInfo} />} />
          </Switch>

          {/* NavBar Below */}
          <Route path="/"
            render={props => <Navbar {...props} user={this.state.user} setUser={this.setUser} />} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;