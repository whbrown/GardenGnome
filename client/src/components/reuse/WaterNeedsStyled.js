import styled, {ThemeProvider} from 'styled-components';
import theme from './theme';

const WaterNeeds = styled.div`
  background: ${props => props.theme.white};
  &.topicTitle {
    font-weight: 600;
  }
  &.frequency {
    color: #3B9CE1;
    -webkit-box-shadow: 0px 0px 12px 10px rgba(216,235,249,1);
    -moz-box-shadow: 0px 0px 12px 10px rgba(216,235,249,1);
    box-shadow: 0px 0px 12px 10px rgba(216,235,249,1);
  }
`;
export default WaterNeeds;