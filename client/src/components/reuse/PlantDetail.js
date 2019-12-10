import styled, {ThemeProvider} from 'styled-components';
import theme from './theme';

const PlantDetail = styled.div`
  background: ${(props) => props.theme.white};
  border-radius: 10px;
  margin: 1em 0;
  padding: 0.5rem;
  box-shadow: 0 0px 10px rgba(0,0,0,.1);
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  max-width: 90%;
`

export default PlantDetail