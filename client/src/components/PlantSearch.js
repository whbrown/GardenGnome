import React, { Component } from "react";
// import axios from 'axios'

class PlantSearch extends Component {
  state = {
    query: ""
  };

  handleChange = event => {
    // Changes parent's state property - "searchQuery"
    this.props.newQuery(event.target.value);
    // Parent's axios request based on searchQuery
    this.props.getPlants();
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   axios.get('/api/plants', {

  //   })
  // }


  // method = debounce(() => {

  render() {
    return (
      <div>
        <label htmlFor="">Search by plant name</label>
        <input
          type="text"
          name="query"
          id="query"
          onChange={this.handleChange}
          value={this.props.searchQuery} />
      </div>
    );
  }
  // });
}


export default PlantSearch;
