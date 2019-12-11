import React, { Component } from "react";
import axios from 'axios';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {
  state = {
    searching: false,
  }
  // debounces the axios requests to plant database, resolving only the last promise stored up to 500ms after last input, whereupon the GET request is then made
  searchAPIDebounced = AwesomeDebouncePromise(this.props.getPlants, 500);

  handleChange = async event => {
    // Changes parent's state property - "searchQuery"
    await this.props.setQuery(event.target.value);
    // Parent's axios request based on searchQuery
    if (this.props.searchQuery) {
      await this.setState({
        searching: true
      })
      const response = await this.searchAPIDebounced(this.props.searchQuery);
      await this.props.setFilteredPlants(response.data);
      await this.setState({
        searching: false
      })
    }
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   axios.get('/api/plants', {

  //   })
  // }


  // method = debounce(() => {

  render() {
    console.log(this.state)
    return (
      <div className="d-flex flex-column align-items-center col-4">
        {/* <label htmlFor="">Search by name: </label> */}
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3"><FontAwesomeIcon icon={faSearch}/></span>
          </div>
          <input
            type="text"
            name="query"
            class="form-control"
            aria-describedby="basic-addon3"
            id="query"
            onChange={this.handleChange}
            value={this.props.searchQuery}
            placeholder={"Start typing to search by name..."} />
        </div>
        {this.state.searching && 
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        }
      </div>
    );
  }
  // });
}


export default SearchBar;
