import React, { Component } from "react";
import axios from 'axios';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

class PlantSearch extends Component {
  // debounces the axios requests to plant database, resolving only the last promise stored up to 500ms after last input, whereupon the GET request is then made
  searchAPIDebounced = AwesomeDebouncePromise(this.props.getPlants, 300);

  handleChange = async event => {
    // Changes parent's state property - "searchQuery"
    await this.props.setQuery(event.target.value);
    // Parent's axios request based on searchQuery
    const response = await this.searchAPIDebounced(this.props.searchQuery);
    await this.props.setFilteredPlants(response.data);
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
