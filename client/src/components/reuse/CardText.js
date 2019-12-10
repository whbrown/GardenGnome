import styled from 'styled-components';

const CardText = styled.p`
  margin: 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${(props) => props.theme.black};
  text-align: ${props => props.textAlign};
`

export default CardText