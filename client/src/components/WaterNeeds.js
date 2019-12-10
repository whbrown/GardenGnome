import React, { Component } from "react";
import axios from 'axios';
import WaterNeedsStyled from './reuse/WaterNeedsStyled';
import H4 from './reuse/H4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint } from '@fortawesome/free-solid-svg-icons'

class WaterNeeds extends Component {
  state = {
    frequencyMessage: '',
  }

  // "waterRequirements": [
  //   "Average Water Needs;  Water regularly; do not overwater",
  //   "Drought-tolerant; suitable for xeriscaping",
  //   "Requires consistently moist soil; do not let dry out between waterings",
  //   "Very high moisture needs; suitable for bogs and water gardens"
  // ]
  componentWillMount() {
    if (!this.props.waterRequirements.length) {
      console.log('axios get request:', `/search/genus=${this.props.genus}&waterRequirements=true`);
      axios.get(`/api/plants/search/genus=${this.props.genus}&waterRequirements=true`).then((res) => console.log(res))
    }

    const quantifyNeeds = (requirements) => {
      return Array.from(new Set(requirements)).reduce((requirementSum, requirementLevel) => {
        switch(requirementLevel) {
          case "Drought-tolerant; suitable for xeriscaping":
             return requirementSum + 1;
          case "Average Water Needs;  Water regularly; do not overwater": 
             return requirementSum + 4;
          case "Requires consistently moist soil; do not let dry out between waterings":
            return requirementSum + 7;
          case "Very high moisture needs; suitable for bogs and water gardens":
            return requirementSum + 10;
          default:
            return requirementSum;
        }
      }, 0) / requirements.length;
    }
    const quantifiedWaterNeeds = quantifyNeeds(this.props.waterRequirements)

    const frequencyMessage = (quantifiedWaterNeeds) => {
      // const { quantifiedWaterNeeds } = this.state;
      if (quantifiedWaterNeeds < 2) return 'once a fortnight';
      if (quantifiedWaterNeeds < 4) return 'every 10 days';
      if (quantifiedWaterNeeds < 6) return 'once a week';
      if (quantifiedWaterNeeds > 6) return 'every few days';
    }
    // parseNeeds(this.props.waterRequirements);
    this.setState({
      frequencyMessage: frequencyMessage(quantifiedWaterNeeds)
    })
  }
  render() {
    console.log('water needs state:', this.state);
    return (
      <WaterNeedsStyled quantifiedWaterNeeds={this.state.quantifiedWaterNeeds}>
         <H4 className='topicTitle'><FontAwesomeIcon icon={faTint}/> Water</H4>
         <p><span className='frequency'>{this.state.frequencyMessage}</span></p>
      </WaterNeedsStyled>
    )
  }
}
export default WaterNeeds;