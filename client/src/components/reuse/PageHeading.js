import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';

const PageHeading = styled.h2`
  font-weight: 800;
  /* color: ${(props) => props.theme.black}; */
  color: #008000;
  margin: 0 0 20px 15px;
  text-align: ${props => props.textAlign};
`;

export default PageHeading;