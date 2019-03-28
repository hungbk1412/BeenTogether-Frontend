import React, { Component } from "react";
import axios from "../axios";
import config from "../config";
import CreatePost from "./CreatePost";
import ModalEachPost from "./ModalEachPost";
import io from 'socket.io-client';

class LoveDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      post: "",
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    this.setState({
      modal: !this.state.modal,
      postId: event.target.id
    });
    axios.get(`/api/posts/${event.target.id}`).then(data => {
      this.setState({ post: data.data })
    }).catch(err => console.log(err))
  }

  checkModalPost = () => {
    axios.get(`/api/posts/${this.state.post._id}`).then(data => {
      this.setState({ post: data.data })
    }).catch(err => console.log(err))
  }

  componentDidMount() {
    // const socket = io(config.rootPath);
    this.props.socket.on('posts', (posts) => {
      this.props.rela ? this.props.rela.inRelationship.map(inRelationship => {
        if(inRelationship._id === this.props.id) {
          this.setState({ data: posts })
        }
      }) : console.log(" ")
    })
    
    axios
      .get("/api/relationships/getPostOfRela")
      .then(data => {
        this.setState({ data: data.data });
      })
      .catch(err => console.log(err));
  }

  onCheckPost = async () => {
    try {
      const data = await axios.get("/api/relationships/getPostOfRela")
      this.setState({ data: data.data });
    } catch (error) {
      return error
    }
  }

  render() {
    const postHTML = this.state.data && this.state.data.length > 0
      ? this.state.data.map(post =>
          post.imageUrl ? (
            <div onClick={this.toggle} className="post" key={post._id} id={post._id}>
              <img src={config.rootPath + post.imageUrl} alt="imgpost" id={post._id}/>
              <p id={post._id}>{post.description}</p>
            </div>
          ) : (
            <div onClick={this.toggle} className="post" key={post._id} id={post._id}>
              <p style={{ fontFamily: 'Pacifico', fontSize: "20px", color: "#aaa" }} id={`${post._id}`}>{post.content}</p>
            </div>
          )
        )
      : "";
    return (
      <div id="love-diary">
        <div className="love-title f-main">
          <h1>LoveDiary</h1>
        </div>
        <CreatePost socket={this.props.socket} id={this.props.id} onCheckPost={this.onCheckPost}/>
        <div className="container f-main">
          {postHTML}
        </div>
        <ModalEachPost checkModalPost={this.checkModalPost} post={this.state.post} toggle={this.toggle} modal={this.state.modal} />
      </div>
    );
  }
}

export default LoveDiary;
