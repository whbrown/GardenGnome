import React, { Component } from "react";
import axios from 'axios'

class PlantSearch extends Component {
  state = {
    query: ""
  };

  handleChange = event => {
    // this.setState({
    //   [event.target.name]: event.target.value
    // });
    this.props.newQuery(event.target.value)
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.get('/api/plants', {

    })
  }

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
