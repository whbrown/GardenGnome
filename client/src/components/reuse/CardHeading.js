import styled, {ThemeProvider} from 'styled-components';
import theme from './theme';

const CardHeading = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.black};
  margin: 5px 10px;
  text-align: ${props => props.textAlign};
`

export default CardHeading