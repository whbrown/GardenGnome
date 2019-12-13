import styled from 'styled-components'

const CardSubheading = styled.p`
  margin: 5px 10px;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgb(110, 110, 110);
  text-align: ${props => props.textAlign};
`

export default CardSubheading