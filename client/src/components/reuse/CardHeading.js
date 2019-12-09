import styled from 'styled-components'

const CardHeading = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  color: rgb(73, 101, 77);
  margin: 5px 10px;
  text-align: ${props => props.textAlign};
`

export default CardHeading