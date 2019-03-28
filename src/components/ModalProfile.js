import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "../axios";
import moment from "moment";

export default class ModalProfile extends Component {
  state = { curTime: moment().format('YYYY-MM-DD') };
  componentDidMount() {
    axios
      .get(`/api/users/${this.props.id}`)
      .then(data => {
        this.setState({
          username: data.data.username,
          phone: data.data.phone,
          email: data.data.email,
          birthday: moment(`${data.data.birthday}`, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          )
        });
      })
      .catch(err => console.log(err));

      axios.get('/api/relationships/getRelaForUser').then(data => {
        this.setState({ startTime: data.data.startTime, relaId: data.data._id })
      }).catch(err => console.log(err))
  }
  handleInputUsername = event => {
    this.setState({ username: event.target.value });
  };
  handleInputEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleInputPhone = event => {
    this.setState({ phone: event.target.value });
  };
  handleInputBirthday = event => {
    this.setState({ birthday: event.target.value });
  };
  handleInputStartTime = event => {
    this.setState({ startTime: event.target.value });
  }
  handleInputPassword = event => {
    this.setState({ password: event.target.value })
  }
  handleUpdate = () => {
    moment(this.state.startTime).diff(this.state.curTime, 'days') < 0 ? axios.put(`/api/relationships/${this.state.relaId}/startTime`, {
      startTime: this.state.startTime
    }).then(data => {
      console.log(data)
    }).catch(err => console.log(err)) : axios.get('/api/relationships/getRelaForUser').then(data => {
      this.setState({ startTime: data.data.startTime, noti: "ngày của tương lai" })
      setTimeout(
        function() {
          this.setState({ noti: "" })
        }.bind(this),
        1000
      );
    }).catch(err => console.log(err))
    axios
      .put(`/api/users/${this.props.id}/userInfo`, {
        username: this.state.username,
        email: this.state.email,
        birthday: this.state.birthday,
        phone: this.state.phone
      })
      .then(data => {
        this.props.toggle();
      })
      .catch(err => this.setState({ noti: "nhập sai hoặc thiếu" }));
    
    this.state.password ? axios.put(`/api/users/${this.props.id}/userAccount`, {
      password: this.state.password
    })
    .then(data => {})
    .catch(err => {}) : console.log("")
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>Cập nhật thông tin</ModalHeader>
          <ModalBody>
            <div className="create-row">
              <p>Username</p>
              <input
                type="text"
                onChange={this.handleInputUsername}
                value={this.state.username}
              />
            </div>
            <div className="create-row">
              <p>Email</p>
              <input
                type="email"
                onChange={this.handleInputEmail}
                value={this.state.email}
              />
            </div>
            <div className="create-row">
              <p>Phone</p>
              <input
                type="text"
                onChange={this.handleInputPhone}
                value={this.state.phone}
              />
            </div>
            <div className="create-row">
              <p>Birthday</p>
              <input
                type="date"
                onChange={this.handleInputBirthday}
                value={this.state.birthday}
              />
            </div>
            <div className="create-row">
              <p>Start time of Relationship</p>
              <input
                type="date"
                onChange={this.handleInputStartTime}
                value={this.state.startTime}
              />
            </div>
            <div className="create-row">
              <p>Mật khẩu</p>
              <input
                type="password"
                onChange={this.handleInputPassword}
                value={this.state.password}
              />
            </div>
            <p style={{color:"red"}}>{this.state.noti ? this.state.noti : ""}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleUpdate}>
              Lưu thông tin
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
