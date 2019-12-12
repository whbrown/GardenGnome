import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


// import { Link } from "react-router-dom";
import axios from 'axios'
import CardText from './reuse/CardText'
import CardHeading from './reuse/CardHeading'
import UserCard from './reuse/UserCard'
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
    axios
      .put(`/api/user/${this.props.match.params.id}/comment`, { comment: this.state.comment })
      .then(targetUser => {
        console.log("ADDED COMMENT to TARGET USER: ", targetUser)
        this.setState({
          comment: ""
        });
        this.props.setTargetUser(targetUser.data)
      })
  }

  deleteComment = (id) => {
    console.log("IDDDDD", id)
    axios
      .put(`/api/user/${this.props.match.params.id}/deletecomment`, { commentId: id })
      .then(targetUser => {
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
            <textarea type="text" name="comment" value={this.state.comment} onChange={this.commentHandler} style={{ borderRadius: "10px", marginTop: "20px" }} />
            <button type="submit" style={{ border: "none", borderRadius: "15px", height: "30px", width: "100%", marginTop: "10px", backgroundColor: "green", color: "white" }} >Add Comment</button>
          </form>
        }
        {this.props.targetUser.comments && (this.props.targetUser.comments.length == 0 ?
          <p style={{ margin: "20px" }}>No comments</p> : this.props.targetUser.comments.map(comment => {
            // Avoids the initial render error where user's plantId is NULL and throws an error
            return (
              <div className="row" key={comment._id}>
                <div className="col-md-8">
                  <div className="comments-list">
                    <div className="media" >
                      <UserCard className="media-body" style={{ margin: "10px 0 0 0" }}>
                        <img src={comment.user.imageUrl} style={{ width: "60px", height: "60px", backgroundColor: "white", borderRadius: "50%", objectFit: "contain" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                          <div>
                            <div style={{ display: "flex" }}>
                              <CardHeading className="media-heading user_name">{comment.user.username}</CardHeading>
                              <CardText style={{ margin: "6px 10px" }}>{comment.date.slice(0, 10)}</CardText>
                            </div>
                            <CardText>{comment.comment}</CardText>
                          </div>
                          {this.props.match.params.id == this.props.user._id &&
                            <IconButton onClick={() => this.deleteComment(comment._id)} aria-label="delete" style={{ padding: 0, margin: "10px" }}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        </div>
                      </UserCard>
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