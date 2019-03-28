import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "../axios";

export default class ModalAvatar extends Component {
  state = { image: null };
  handleInput = event => {
      console.log(event.target.files)
    this.setState({ image: event.target.files[0] });
  };
  handleAvatar = () => {
    let file = this.state.image;
    let formData = new FormData();
    formData.append("image", file);
    axios.put(`/api/users/${this.props.userId}/avatar`, formData).then(data =>{
        this.props.toggle1();
    }).catch(err => this.props.toggle1())
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modal1}
          toggle1={this.props.toggle1}
          className={this.props.className}
        >
          <ModalHeader toggle1={this.props.toggle1}>Cập nhật Avatar</ModalHeader>
          <ModalBody>
            <input onChange={this.handleInput} type="file" name="image" />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleAvatar}>
              Cập nhật
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle1}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
