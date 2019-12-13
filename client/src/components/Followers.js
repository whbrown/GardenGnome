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

class Followers extends Component {

  state = {
    followers: [],
  }

  componentDidMount() {
    const { user, match } = this.props;
    if (Object.entries(user).length === 0 && user.constructor === Object) {
      this.props.history.goBack();
    }
    console.log('followers props', this.props);
    axios.get(`/api/user/${match.params.id}/followers`).then((res) => {
      return this.setState({
        followers: res.data.followers,
      })
    }).catch(err => console.log(err))
  }

  render() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }}>
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={() => this.props.history.goBack()} />
        <PageHeading textAlign="left" margin="(65px 0 0 0)">{user.username}'s followers:</PageHeading>
        {this.state.followers.map(follower => {
          return (
            <Link to={`/user/${follower._id}/plants`}>
              <ProfileCard>
                <Img src={follower.imageUrl} alt="profile picture" />
                <div style={{ margin: "0 20px" }}>
                  <CardHeading>{follower.username}</CardHeading>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <CardText>Garden Size:</CardText>
                    <CardText>({follower.garden.length})</CardText>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <CardSubheading>Wishlist:</CardSubheading>
                    <CardSubheading>({follower.wishList.length})</CardSubheading>
                  </div>
                </div>
              </ProfileCard>
            </Link>)
        })}


      </div>
    )
  }
}

export default Followers;

