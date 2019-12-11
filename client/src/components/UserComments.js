import React, { Component } from "react";
import { Route } from 'react-router-dom';
import '../App.css';

// import { Link } from "react-router-dom";
import axios from 'axios'
import PageHeading from './reuse/PageHeading'
import CardText from './reuse/CardText'
import H3 from './reuse/H3'
import H4 from './reuse/H4'
import CardHeading from './reuse/CardHeading'
import PlantCard from './reuse/PlantCard'
import styled from 'styled-components'


const Img = styled.img`
  width: 120px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
`

class UserComments extends Component {

  state = {
    comment: ""
  }

  handleClick = () => {
    axios
      .post("/api/plants/mygarden")
      .then(response => {
        this.props.setUser(response.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderComments = () => {
    axios
      .get(`/api/user/${this.props.match.params.id}/comments`)
      .then(response => {
        this.props.setTargetUser(response.data)
      })
  }

  addComment = (event) => {
    event.preventDefault()
    console.log("THIS STATE after adding comment: ", this.state)
    axios
      .put(`/api/user/${this.props.match.params.id}/comment`, { comment: this.state.comment })
      .then(targetUser => {
        console.log("ADDED COMMENT to TARGET USER: ", targetUser)
        this.props.setTargetUser(targetUser.data)
      })
  }

  deleteComment = (id) => {
    console.log("IDDDDD", id)
    axios
      .put(`/api/user/${this.props.match.params.id}/deletecomment`, { commentId: id })
      .then(targetUser => {
        console.log("REMOVED COMMENT from MY page: ", targetUser)
        this.props.setTargetUser(targetUser.data)
      })
  }

  commentHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Do a componentDidMount where you do a GET request for the user
  componentDidMount() {
    this.renderComments();
  }

  render() {
    return (
      <div className="container">
        {this.props.match.params.id !== this.props.user._id &&
          <form onSubmit={this.addComment} style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Add comment:</label>
            <textarea type="text" name="comment" value={this.state.comment} onChange={this.commentHandler} />
            <button type="submit">Add Comment</button>
          </form>
        }
        {this.props.targetUser.comments && (this.props.targetUser.comments.length == 0 ?
          <p>No comments</p> : this.props.targetUser.comments.map(comment => {
            // Avoids the initial render error where user's plantId is NULL and throws an error
            return (
              <div className="row" key={comment._id}>
                <div className="col-md-8">
                  <div className="comments-list">
                    <div className="media">
                      <a className="media-left" href="#">
                        <img src={comment.user.imageUrl} style={{ width: "60px", height: "60px", backgroundColor: "white", borderRadius: "50%", objectFit: "contain" }} />
                      </a>
                      <div className="media-body">
                        <h4 className="media-heading user_name">{comment.user.username}</h4>
                        <CardText>{comment.comment}</CardText>
                        <CardText>{comment.date.slice(0, 10)}</CardText>
                        {this.props.match.params.id == this.props.user._id && <button onClick={() => this.deleteComment(comment._id)}>Delete Comment</button>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )
        }
      </div >
    )
  }
}

export default UserComments;