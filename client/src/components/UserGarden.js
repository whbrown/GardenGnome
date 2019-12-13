import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "../App.css"
import PageHeading from './reuse/PageHeading'
import H3 from './reuse/H3'
import H4 from './reuse/H4'
import UserCard from './reuse/UserCard'
import BackButton from './reuse/BackButton'
import Button from '@material-ui/core/Button';

class UserGarden extends Component {

  handleClick = () => {
    this.props.history.goBack()
  }

  followUser = () => {
    axios
      .patch(`/api/user/${this.props.match.params.id}/following`)
      .then((yourUpdatedInfo) => { console.log("TargetUser added to your 'following' array: ", yourUpdatedInfo) })
      .then(() => {
        axios.patch(`/api/user/${this.props.match.params.id}/follow`)
          .then((followedUser) => {
            this.props.setTargetUser(followedUser.data)
            console.log("Added yourself to TargetUser's 'followers' array: ", followedUser)
          })
      })
  }

  unfollowUser = () => {
    axios
      .patch(`/api/user/${this.props.match.params.id}/unfollowing`)
      .then((yourUpdatedInfo) => { console.log("TargetUser removed from your 'following' array: ", yourUpdatedInfo) })
      .then(() => {
        axios.patch(`/api/user/${this.props.match.params.id}/unfollow`)
          .then((unfollowedUser) => {
            this.props.setTargetUser(unfollowedUser.data)
            console.log("Removed yourself from TargetUser's 'followers' array: ", unfollowedUser)
          })
      })
  }

  renderMyGarden = () => {
    axios
      .get(`/api/user/${this.props.match.params.id}/plants`)
      // .get(`/api/targetUser/${this.props.targetUser._id}/plants`)
      .then(response => {
        this.props.setTargetUser(response.data)
      })
  }

  // // Do a componentDidMount where you do a GET request for all the garden plants
  componentDidUpdate(prevProps) {
    // if (prevProps.match.params.id !== this.props.match.params.id
    if (prevProps.match.params.id !== this.props.match.params.id
      // || prevProps.targetUser.followers !== this.props.targetUser.followers
    ) {
      this.renderMyGarden()
    }
  }

  render() {
    console.log('target user', this.props.targetUser)
    return (
      <div style={{ marginBottom: "80px", padding: "1rem" }} className="fadeIn">
        <BackButton src="../../assets/back-arrow.svg" alt="back-arrow" onClick={this.handleClick} />
        <div style={{ display: "flex" }}>
          <img src="../../assets/leaf.svg" alt="my garden" style={{ height: "30px", width: "30px", objectFit: "contain", margin: "5px 10px" }} />
          <PageHeading textAlign="left">Garden</PageHeading>
        </div>
        <UserCard style={{ display: "flex", justifyContent: "space-between" }}>
          <img src={this.props.targetUser.imageUrl} alt="" style={{ height: "80px", width: "80px", objectFit: "contain", borderRadius: "10px" }} />
          <div style={{ width: "90px", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            <H3>User:</H3>
            <H4 textAlign="left">{this.props.targetUser.username}</H4>
          </div>
          <div style={{ textAlign: "center" }}>
            <div>
              <Link to={`/user/${this.props.targetUser._id}/followers`}><H3>Followers ({this.props.targetUser.followers && this.props.targetUser.followers.length})</H3></Link>
              <Link to={`/user/${this.props.targetUser._id}/isfollowing`}><H3>Following ({this.props.targetUser.following && this.props.targetUser.following.length})</H3></Link>
            </div>
            {/* Conditional rendering of button - prevent you from following yourself */}
            {this.props.targetUser.followers && (this.props.match.params.id !== this.props.user._id) &&
              // both follows/unfollows user AND re-renders the garden
              (this.props.targetUser.followers.includes(this.props.user._id) ?
                // < button onClick={() => { this.unfollowUser() }}>Unfollow</button>
                <Button variant="contained" color="outlined" component="span" style={{ borderRadius: "15px", height: "30px", width: "100px", marginTop: "5px" }} onClick={() => { this.unfollowUser() }}>Unfollow</Button>
                :
                <Button variant="contained" color="primary" component="span" style={{ borderRadius: "15px", height: "30px", width: "100px", marginTop: "5px" }} onClick={() => { this.followUser() }}>Follow</Button>
              )
            }
          </div>
        </UserCard>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
          <Link to={`/user/${this.props.targetUser._id}/plants`}>
            <H4>Plants</H4>
          </Link>
          <Link to={`/user/${this.props.targetUser._id}/comments`}>
            <H4>Comments</H4>
          </Link>
          <Link to={`/user/${this.props.targetUser._id}/wishlist`}>
            <H4>Wishlist</H4>
          </Link>
        </div>
        {this.props.children}
      </div >)
  }
}

export default UserGarden;