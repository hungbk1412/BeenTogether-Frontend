import React, { Component } from "react";
import axios from "../axios";
import io from 'socket.io-client';
import config from "../config";

export default class Comment extends Component {
  handleComment = event => {
    if (event.key === "Enter") {
      const socket = io(config.rootPath);
      axios
        .post(`/api/posts/${this.props.post._id}/comment`, {
          content: event.target.value
        })
        .then(data => {
          socket.emit('postId', this.props.post._id)
          this.props.checkModalPost();
        })
        .catch(err => console.log(err));
      event.target.value = "";
    }
  };
  render() {
    return (
      <div className="container comment-post-input">
        <textarea
          onKeyPress={this.handleComment}
          className="col"
          placeholder="Bình luận"
        />
      </div>
    );
  }
}
