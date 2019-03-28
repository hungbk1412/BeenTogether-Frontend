import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "../axios";
import io from 'socket.io-client';
import config from "../config";

export default class ModalPost extends Component {
  state = {
    image: null,
    text: ""
  };

  handleText = event => {
    this.setState({ text: event.target.value });
  };

  handleInput = event => {
    this.setState({ image: event.target.files[0] });
  };

  handlePost = () => {
    // const socket = io(config.rootPath);
    let file = this.state.image;
    let formData = new FormData();
    formData.append("image", file);
    formData.append("description", this.state.text);
    this.state.image
      ? axios
          .post("/api/posts/image", formData)
          .then(data => {            
            this.props.toggle();
            this.props.socket.emit('userId', this.props.id)
            this.props.onCheckPost();
          })
          .catch(err => console.log(err))
      : this.state.text || this.state.text !== ""
      ? axios
          .post("/api/posts/content", {
            content: this.state.text
          })
          .then(data => {
            console.log(data);
            this.props.toggle();
            this.props.socket.emit('userId', this.props.id)      
            this.props.onCheckPost();
          })
          .catch(err => console.log(err))
      : console.log("Không đủ dữ liệu");
      this.setState({ text: "" })
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle} className="f-main">Kỉ niệm</ModalHeader>
          <ModalBody>
            <div id="create-post-form" className="f-main">
              <textarea onChange={this.handleText} placeholder="Hãy kể một câu chuyện" value={this.state.text}/>
              <input className="f-main" onChange={this.handleInput} type="file" name="image" value="" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handlePost}>
              Đăng
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle}>
              Hùy
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
