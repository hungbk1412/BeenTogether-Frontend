import React, { Component } from 'react'
import axios from '../axios';
import config from '../config';

import { Link } from 'react-router-dom'; 
import ModalProfile from './ModalProfile';
import avatarDefault from '../images/avatarDefault.png'
import ModalAvatar from './ModalAvatar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal1: false,
    };
    
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    axios.get(`/api/users/${this.props.match.params.id}`).then(data => {
      this.setState({ profile: data.data })
    }).catch(err => console.log(err))
  }

  toggle1() {
    this.setState({
      modal1: !this.state.modal1,
    });
    axios.get(`/api/users/${this.props.match.params.id}`).then(data => {
      this.setState({ profile: "" })
      this.setState({ profile: data.data })
    }).catch(err => console.log(err))
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`).then(data => {
      this.setState({ profile: data.data })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div id="profile">
        <div className="container">
          {this.state.profile ? <img onClick={this.props.userId === this.props.match.params.id ? this.toggle1 : ""} src={this.state.profile.contentType ? `${config.rootPath}${this.state.profile.avatarUrl}` : avatarDefault} alt="avatar" /> : ""}
          <ModalAvatar userId={this.props.userId} toggle1={this.toggle1} modal1={this.state.modal1}/>
          <div className="profile-info f-main">
            <div className="profile-info-title">Thông tin cá nhân</div>
            <div className="profile-info-text">
              <div className="info-title">
                <p>Username</p>
                <p>Mật khẩu</p>
                <p>Email</p>
                <p>Số điện thoại</p>
                <p>Ngày sinh</p>
                <p>ID Relationship</p>
              </div>
              <div className="info-detail">
                <p>{this.state.profile ? this.state.profile.username : ""}</p>
                <p>********</p>
                <p>{this.state.profile ? this.state.profile.email : ""}</p>
                <p>{this.state.profile ? this.state.profile.phone : ""}</p>
                <p>{this.state.profile ? this.state.profile.birthday : ""}</p>
                <p>{this.state.profile ? this.props.relaId : ""}</p>
              </div>
            </div>
            <div className="profile-info-button">
              {this.props.userId === this.props.match.params.id ? <button onClick={this.toggle}>Cập nhật</button> : "" }
              <ModalProfile id={this.props.match.params.id} profile={this.state.profile} toggle={this.toggle} modal={this.state.modal}/>
              <Link to={`/`}><button>Trở về</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile