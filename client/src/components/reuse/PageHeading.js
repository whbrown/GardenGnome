import styled, {ThemeProvider} from 'styled-components';
import theme from './theme';

const PageHeading = styled.h2`
  font-weight: 800;
  color: ${(props) => props.theme.black};
  margin: ${props => props.margin};
  text-align: ${props => props.textAlign};
`;

export default PageHeading;