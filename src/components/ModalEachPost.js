import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment, { duration } from "moment";
import Comment from "./Comment";
import config from "../config";
import { Link } from 'react-router-dom';
import avatarDefault from '../images/avatarDefault.png'

export default class ModalEachPost extends Component {

  componentWillMount() {
    this.props.checkModalPost()
  }
  render() {
    // Tình thời gian đăng bài
    const time = moment().format("hh:mm:ss a");
    const createdAt = moment(`${this.props.post.createdAt}`).format(
      "hh:mm:ss a"
    );
    const duration = moment.duration(
      moment(`${time}`, "hh:mm:ss a").diff(moment(`${createdAt}`, "hh:mm:ss a"))
    );
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) % 60;
    const temp = moment(`${this.props.post.createdAt}`).format("MM-DD-YYYY");
    const newtemp = moment().format("MM-DD-YYYY");
    const result = moment(`${newtemp}`).diff(`${temp}`, "days");
    // Modal comment posts
    const post = this.props.post.imageUrl ? (
      <div className="container post-content-img">
        <p>{this.props.post.description}</p>
        <img
          className="col"
          src={`${config.rootPath}${this.props.post.imageUrl}`}
          alt="imagepost"
        />
      </div>
    ) : (
        <div className="container post-content-noimg">
          <p>{this.props.post.content}</p>
        </div>
      );
    const userPost = this.props.post.createdBy ? (
      <div className="post-info">
        <div>
          <Link to={`/${this.props.post.createdBy._id}/profile`}><img
            src={this.props.post.createdBy.contentType ? `${config.rootPath}/api/users/${
              this.props.post.createdBy._id
              }/avatar` : avatarDefault}
            alt="avatar"
          /></Link>
        </div>
        <div>
          <p>
            {this.props.post.createdBy.username}
          </p>
          <p>
            {result === 0
              ? hours !== 0
                ? ` ${hours}:${minutes} phút trước`
                : `${minutes} phút trước`
              : result === 1
                ? "Hôm qua lúc " + ` ${createdAt}`
                : moment(`${this.props.post.createdAt}`).format("DD-MM-YYYY") +
                ` lúc ${createdAt}`}
          </p>
        </div>
      </div>
    ) : (
        ""
      );
    const comments = this.props.post.comments
      ? this.props.post.comments.map(comment => (
        <div className="container comment-author" key={comment._id}>
          <Link to={`/${comment.createdBy._id}/profile`}><img
            src={comment.createdBy.contentType ? `${config.rootPath}/api/users/${
              comment.createdBy._id
              }/avatar` : avatarDefault}
            alt="avatar"
          /></Link>
          <span>
            <h4>{comment.createdBy.username}{" "}</h4>
          </span>
          <span>
            <p>{comment.content}</p>
          </span>
        </div>
      ))
      : ""
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>{userPost}</ModalHeader>
          <ModalBody>
            {post}
            {comments}
            <Comment post={this.props.post} checkModalPost={this.props.checkModalPost} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
