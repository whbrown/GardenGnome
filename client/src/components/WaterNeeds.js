import React, { Component } from "react";
import axios from 'axios';
import WaterNeedsStyled from './reuse/WaterNeedsStyled';
import H4 from './reuse/H4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';

class WaterNeeds extends Component {
  state = {
    quantifiedWaterNeeds: 0,
    frequencyMessage: '',
    formattedMoistureType: '',
    formattedWaterRequirements: '',
  }

  formatWaterRequirements = (requirementLevel) => {
    switch(requirementLevel) {
      case "Drought-tolerant; suitable for xeriscaping":
         return `Very drought-tolerant. Can survive without reliable watering.`;
      case "Average Water Needs;  Water regularly; do not overwater": 
         return `It has average water needs. Water regularly, but make sure not to overwater"`;
      case "Requires consistently moist soil; do not let dry out between waterings":
        return `It requires consistently moist soil. Don't let it dry out between waterings!`
      case "Very high moisture needs; suitable for bogs and water gardens":
        return `It has very high moisture needs, most suitable for bogs and water gardens.`;
      default:
        return requirementLevel;
    }
  }

  quantifyWaterNeeds = (requirements) => {
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

  formatMoistureMsg = moistureTypes => {
    moistureTypes = moistureTypes.map((moisture) => moisture.toLowerCase())
    switch (moistureTypes.length) {
      case 0:
        return null;
      case 1:
        return `${moistureTypes[0]}`;
      case 2:
        return `between ${moistureTypes[0]} & ${moistureTypes[1]}`;
      default:
        return `between ${moistureTypes.slice(0, moistureTypes.length - 1).join(', ')} & ${
          moistureTypes[moistureTypes.length - 1]
        }`;
      }
  }

  frequencyMessage = (quantifiedWaterNeeds) => {
    // const { quantifiedWaterNeeds } = this.state;
    if (quantifiedWaterNeeds < 2) return 'once a fortnight';
    if (quantifiedWaterNeeds < 4) return 'every 10 days';
    if (quantifiedWaterNeeds < 6) return 'once a week';
    if (quantifiedWaterNeeds > 6) return 'every few days';
  }


  async componentDidMount() {

    if (!this.props.waterRequirements.length) {
      console.log('axios get request:', `/search/genus=${this.props.genus}&waterRequirements=true`);
      axios.get(`/api/plants/search/genus=${this.props.genus}&waterRequirements=true`)
      .then((res) => {
        console.log('res.data', res.data);
        
        return [res.data.waterRequirements[0], this.quantifyWaterNeeds(res.data.waterRequirements)];
      })
      .then(([waterRequirements, quantifiedWaterNeeds]) => {
        console.log('quantifiedWaterNeeds', quantifiedWaterNeeds)
        this.setState({
          formattedWaterRequirements: this.formatWaterRequirements(waterRequirements),
          quantifiedWaterNeeds: quantifiedWaterNeeds,
          frequencyMessage: this.frequencyMessage(quantifiedWaterNeeds)
        }, () => {
          if (this.props.moistureTypes) {
            this.setState({formattedMoistureType: this.formatMoistureMsg(this.props.moistureTypes)})
          }
        });
      })
        
    } else {
      const quantifiedWaterNeeds = this.quantifyWaterNeeds(this.props.waterRequirements)
      this.setState({
        formattedWaterRequirements: this.formatWaterRequirements(this.props.waterRequirements[0]),
        frequencyMessage: this.frequencyMessage(quantifiedWaterNeeds)
      }, () => {
        if (this.props.moistureTypes) {
          this.setState({
            formattedMoistureType: this.formatMoistureMsg(this.props.moistureTypes),
          })
        }
      })
    }
    // parseNeeds(this.props.waterRequirements);
  }
  render() {
    console.log('water needs state:', this.props);
    return (
      <WaterNeedsStyled quantifiedWaterNeeds={this.state.quantifiedWaterNeeds}>
         <H4 className='topicTitle'><FontAwesomeIcon icon={faTint}/> Water</H4>
  <p>This plant should be watered <span className='waterFrequency'>{this.state.frequencyMessage}</span>{this.state.formattedMoistureType ? <span>, and the soil kept <span className='soilMoisture'>{this.state.formattedMoistureType}</span></span> : ''}</p>.
  {this.props.waterRequirements.length ? <p>{this.state.formattedWaterRequirements}</p> : ''}
      </WaterNeedsStyled>
    )
  }
}
export default WaterNeeds;