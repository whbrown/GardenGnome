import styled, {ThemeProvider} from 'styled-components';
import theme from './theme';

const WaterNeeds = styled.div`
  background: ${props => props.theme.white};
  & .topicTitle {
    font-weight: 600;
  }
  & .waterFrequency {
    color: #3B9CE1;
    margin: 0 0.1em;
    background: rgba(216,235,249, 0.3);
    -webkit-box-shadow: 0px 0px 10px 1px rgba(216,235,249, ${props => (props.quantifiedWaterNeeds / 10) + 0.2});
    -moz-box-shadow: 0px 0px 10px 1px rgba(216,235,249, ${props => (props.quantifiedWaterNeeds / 10) + 0.2});
    box-shadow: 0px 0px 10px 1px rgba(216,235,249, ${props => (props.quantifiedWaterNeeds / 10) + 0.2});
  }
  & .soilMoisture {
    color: #472C02;
    margin: 0 0.1em;
    background: rgba(149, 93, 9, 0.2);
    -webkit-box-shadow: 0px 0px 10px 2px rgba(149, 93, 9, 0.3);
    -moz-box-shadow: 0px 0px 10px 2px rgba(149, 93, 9, 0.3);
    box-shadow: 0px 0px 10px 2px rgba(149, 93, 9, 0.3);
  }
`;

export default WaterNeeds;