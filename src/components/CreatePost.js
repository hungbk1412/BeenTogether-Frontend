import React, { Component } from "react";
import ModalPost from "./ModalPost";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div className="create-post-container f-main">
        <button onClick={this.toggle} className="create-post-button">
          Đăng kỉ niệm
        </button>
        <ModalPost socket={this.props.socket} id={this.props.id} onCheckPost={this.props.onCheckPost} toggle={this.toggle} modal={this.state.modal}/>
      </div>
    );
  }
}
