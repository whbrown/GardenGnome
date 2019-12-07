import styled from 'styled-components'

const H2 = styled.h2`
  font-weight: 800;
  color: rgb(37, 54, 41);
  margin: ${props => props.margin};
  text-align: ${props => props.textAlign};
`

export default H2