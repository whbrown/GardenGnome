import styled, {ThemeProvider} from 'styled-components';
import theme from './theme';

const DetailsContainer = styled.div`
  background: ${(props) => props.theme.offwhite};
  color: ${(props) => props.theme.primary};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  /* justify-content: center; */
  margin: 0 auto;
  min-height: 100vh;
  max-width: 100%;
  overflow-wrap: break-word;
`;
export default DetailsContainer;