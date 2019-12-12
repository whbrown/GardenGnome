import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from "axios";
import './App.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


// REACT COMPONENTS:
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import UserGarden from "./components/UserGarden";
import Gnomes from "./components/Gnomes";
import PlantSearch from "./components/PlantSearch";
import PlantDetails from "./components/PlantDetails"
import { ThemeProvider } from 'styled-components';
import theme from './components/reuse/theme';
import UserPlants from "./components/UserPlants"
import UserComments from "./components/UserComments"
import UserWishlist from "./components/UserWishlist"

// MAKING PUBLIC FOLDER STATIC?
// const express = require("express");
// const path = require("path");
// const app = express();
// app.use(express.static(path.join(__dirname, "public")));
// optional cofiguration

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 1500,
  offset: '100px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

class App extends Component {
  state = {
    user: this.props.user,
    targetUser: {},
    filteredPlants: [],
    searchQuery: ``,
    selectedPlantInfo: {
      rhsInfo: {},
      dgInfo: {},
      matchType: null,
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
    }, () => {
      console.log('appjs selectectedplantinfo state', this.state.selectedPlantInfo)
    });
  }

  setTargetUser = user => {
    console.log('target user set')
    this.setState({
      targetUser: user
    })
  }

  render() {
    console.log('appjs state', this.state);
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Switch>
              <Route exact path="/" render={props => <Homepage {...props} user={this.state.user} setUser={this.setUser} />} />
              <Route exact path="/login"
                render={props => <Login {...props} setUser={this.setUser} />} />
              <Route exact path="/signup"
                render={props => <Signup {...props} setUser={this.setUser} user={this.state.user} />} />
              <Route exact path="/user/:id/plants"
                // OPTION FOR SEXIER CODE: Set a state property where you trigger to render a choice of the 3 children of UserGarden
                render={props => (
                  <UserGarden {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} user={this.state.user}>
                    <UserPlants {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} user={this.state.user} />
                  </UserGarden>
                )} />
              <Route exact path="/user/:id/comments"
                render={props => (
                  <UserGarden {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} user={this.state.user}>
                    <UserComments {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} user={this.state.user} />
                  </UserGarden>
                )} />
              <Route exact path="/user/:id/wishlist"
                render={props => (
                  <UserGarden {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} user={this.state.user} >
                    <UserWishlist {...props} targetUser={this.state.targetUser} setTargetUser={this.setTargetUser} user={this.state.user} />
                  </UserGarden>
                )} />
              <Route path="/gnomes"
                render={props => <Gnomes {...props} user={this.state.user} setUser={this.setUser} />} />
              <Route exact path="/plants/search"
                render={props => <PlantSearch {...props} setQuery={this.setQuery} searchQuery={this.state.searchQuery} setFilteredPlants={this.setFilteredPlants} filteredPlants={this.state.filteredPlants} setUser={this.setUser} />} />
              <Route exact path="/plants/id=:id&latinName=:latinName" render={props => <PlantDetails {...props} selectedPlantInfo={this.state.selectedPlantInfo} setSelectedPlantInfo={this.setSelectedPlantInfo} />} />
            </Switch>
            {/* NavBar Below */}
            <Route path="/"
              render={props => <Navbar {...props} user={this.state.user} setUser={this.setUser} />} />
          </div>
        </ThemeProvider>
      </AlertProvider>
    );
  }
}

export default App;