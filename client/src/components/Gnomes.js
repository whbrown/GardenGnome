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
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <div style={{ display: "flex" }}>
          <img src="../../assets/gnome.svg" alt="my garden" style={{ height: "30px", width: "30px", objectFit: "contain", margin: "5px 10px" }} />
          <PageHeading textAlign="left" margin="(65px 0 0 0)">Local Gnomes</PageHeading>
        </div>
        {this.state.gnomes.map(user => {
          return (
            <Link to={`/user/${user._id}/plants`}>
              <ProfileCard>
                <Img src={user.imageUrl} alt="profile picture" />
                <div style={{ margin: "0 20px" }}>
                  <CardHeading>{user.username}</CardHeading>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <CardText>Garden Size: </CardText>
                    <CardText>({user.garden.length})</CardText>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <CardSubheading>Wishlist:</CardSubheading>
                    <CardSubheading>({user.wishList.length})</CardSubheading>
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