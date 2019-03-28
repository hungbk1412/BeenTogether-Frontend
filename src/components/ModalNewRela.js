import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "../axios";
import moment from 'moment';

export default class ModalNewRela extends Component {
  constructor(props) {
    super(props);
    this.state = { startTime: "", relaId: "", curTime: moment().format('YYYY-MM-DD') };
  }

  handleCreate = event => {
    this.setState({ startTime: event.target.value });
  };

  handleJoin = event => {
    this.setState({ relaId: event.target.value });
  };

  handleButtonCreate = () => {
    !this.state.startTime || this.state.relaId
      ? this.setState({ noti: "Nhập Sai hoặc Thiếu", startTime: "", relaId: "" })
      : moment(this.state.startTime).diff(this.state.curTime, 'days') < 0
      ? axios
          .post("/api/relationships", {
            startTime: this.state.startTime
          })
          .then(data => {
            this.props.toggle();
            this.props.onCheckRela();
            this.props.onCheckCreate();
          })
          .catch(err => console.log(err))
      : this.setState({ noti: "ngày của tương lai... :(", startTime: "" });
  };
  handleButtonJoin = () => {
    this.state.startTime || !this.state.relaId
      ? this.setState({ noti: "Nhập Sai hoặc Thiếu", startTime: "", relaId: "" })
      : this.state.relaId
      ? axios
          .put("/api/relationships", {
              relaId: this.state.relaId
          })
          .then(data => {
            this.props.toggle();
            this.props.onCheckRela();
            this.props.onCheckCreate()
          })
          .catch(err => this.setState({ noti: "ID không tồn tại", relaId: "" }))
      : console.log("Không có RelationshipID");
  };
  render() {
    return (
      <div>
        <div>
          <Modal
            isOpen={this.props.modal}
            toggle={this.props.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.props.toggle} className="f-main">Tạo hoặc tham gia</ModalHeader>
            <ModalBody>
              <div className="create-row">
                <p>Tạo mới</p>
                <input
                  type="date"
                  onChange={this.handleCreate}
                  value={this.state.startTime}
                />
              </div>

              <div className="join-row">
                <p>Tham gia</p>
                <input
                  type="text"
                  onChange={this.handleJoin}
                  value={this.state.relaId}
                  placeholder="Nhập ID"
                />
              </div>

              <p className="noti-new-rela">
                {this.state.noti ? this.state.noti : ""}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button className="create-button f-main btn btn-sm btn-info text-light" onClick={this.handleButtonCreate}>
                Tạo mới
              </Button>{" "}
              <Button className="join-button f-main btn btn-sm btn-danger text-light" onClick={this.handleButtonJoin}>
                Tham gia
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
