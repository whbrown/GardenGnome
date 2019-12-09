import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'

/* ---------------------------------------------------------- STYLED COMPONENTS --------------------------------------------------------- */
import PageHeading from './reuse/PageHeading'
import ProfileCard from './reuse/ProfileCard'
import CardHeading from './reuse/CardHeading'
import CardSubheading from './reuse/CardSubheading'
import CardText from './reuse/CardText'
import BackButton from './reuse/BackButton'

const Img = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  /* Makes the profile image a circle */
  border-radius: 50%;
`

class Gnomes extends Component {
  state = {
    gnomes: []
  };

  handleClick = () => {
    this.props.history.goBack()
  }

  componentDidMount() {
    axios
      .get('/api/plants/gnomes')
      .then(response => {
        console.log("LIST OF ALL USERS?: ", response)
        this.setState({
          gnomes: response.data
        })
      })
      .then(() => {
        console.log("THIS.STATE.GNOMES: ", this.state.gnomes)
      })
  }

  render() {
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }}>
        {/* PLACEHOLDER ---- back arrow to be a navigation function */}
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <PageHeading textAlign="left" margin="(65px 0 0 0)">Local Gnomes</PageHeading>
        {this.state.gnomes.map(user => {
          console.log("USER INFORMATION FOR EACH CARD: ", user)
          return (
            <Link to={`/user/${user._id}/plants`}>
              <ProfileCard>
                <Img src={user.imageUrl} alt="profile picture" />
                <div>
                  {/* ALL THIS is placeholder items which should be replaced with a MAP function of all the profiles in the user's KM vicinity */}
                  {/* Perhaps add a simple garden icon which changes depending on how many plants the user has in their garden */}
                  <CardHeading>{user.username}</CardHeading>
                  <CardText>Garden Size: ({user.garden.length})</CardText>
                  <div style={{ display: "flex" }}>
                    <CardSubheading>Seeking:</CardSubheading>
                    <CardText>Rose</CardText>
                  </div>
                  <div style={{ display: "flex" }}>
                    <CardSubheading>Offering:</CardSubheading>
                    <CardText>-</CardText>
                  </div>
                </div>
              </ProfileCard>
            </Link>
          )
        })}
      </div >
    )
  }
}

export default Gnomes;