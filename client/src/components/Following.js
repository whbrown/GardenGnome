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

class Following extends Component {

  state = {
    following: [],
  }

  componentDidMount() {
    const { user, match } = this.props;
    if (Object.entries(user).length === 0 && user.constructor === Object) {
      this.props.history.goBack();
    }
    console.log('following props', this.props);
    axios.get(`/api/user/${match.params.id}/isfollowing`).then((res) => {
      console.log(res.data)
      return this.setState({
        following: res.data.following,
      })
    }).catch(err=> console.log(err))
  }

  render() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }}>
        {/* PLACEHOLDER ---- back arrow to be a navigation function */}
      <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={() => this.props.history.goBack()}/>
      <PageHeading textAlign="left" margin="(65px 0 0 0)">{user.username} is following:</PageHeading>
      {this.state.following.map(user => {
        return (
          <Link to={`/user/${user._id}/plants`}>
            <ProfileCard>
              <Img src={user.imageUrl} alt="profile picture" />
              <div>
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
          </Link>)
    })}
        

      </div>
    )
  }
}

export default Following;

