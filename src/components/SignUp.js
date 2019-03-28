import React, { Component } from 'react'
import axios from '../axios';
import { Link } from 'react-router-dom'
import config from '../config';
import moment from 'moment';

export default class SignUp extends Component {
  state = { confirm: false }
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value })
  }
  onChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value })
  }
  onChangePhone = (event) => {
    this.setState({ phone: event.target.value })
  }
  onChangeBirthday = (event) => {
    this.setState({ birthday: event.target.value })
  }
  handleSingup = () => {
    this.state.username && this.state.password && this.state.email && this.state.phone && this.state.birthday ?
    axios.post('/api/users', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
      birthday: moment(`${this.state.birthday}`, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      )
    }).then(data => {
      this.setState({ confirm: true })
      this.props.onCheckSignup(data.data.username, data.data.id)
    }).catch(err => {
      this.setState({ noti: "Sai thông tin hoặc thông tin đã được đăng kí" })
    }) : this.setState({ noti: "Bạn nhập thiếu thông tin" })
  }
  handleButtonFb = () => {
    // window.location.href = `${config.rootPath}/api/auth/fb`
    this.setState({ noti: "Đang bảo trì, vui lòng thử lại sau :D" })
  }
  render() {
    return (
      <div id="signup">
        <div className="container">
          <div className="login-container f-main">
            <div className="form-banner">
              <div className="snow"></div>
              <div className="snow"></div>
              <div className="snow"></div>
              <div className="snow"></div>
            </div>
            <div class="form">
              <div className="login-title">
                <a className="logo f-heading" href="/">
                  <i className="fas fa-heartbeat"></i>
                  lovebeat
                </a>
                <p>Đăng Ký</p>
              </div>
              <div className="main-form">
                <div className="row1">
                  <div className="username-container">
                    <label>Tên tài khoản</label>
                    <input onChange={ this.onChangeUsername } type="text" name="username" placeholder="Tên tài khoản" required />
                  </div>
                  <div className="password-container">
                    <label>Mât khẩu</label>
                    <input onChange={ this.onChangePassword } type="password" name="password" placeholder="Mật khẩu" required />
                  </div>
                </div>

                <div className="row2">
                  <div>
                    <label>Số điện thoại</label>
                    <input onChange={ this.onChangePhone } type="text" placeholder="Số điện thoại" required />
                  </div>
                  <div>
                    <label>Ngày sinh</label>
                    <input onChange={ this.onChangeBirthday } type="date" placeholder="Ngày sinh" required />
                  </div>
                </div>

                <div>
                  <div>
                    <label>Email</label>
                    <input onChange={ this.onChangeEmail } type="email" placeholder="Email" required />
                  </div>
                  <p style={{color:"red"}}>{this.state.noti}</p>
                  <div className="button-signup">
                    {!this.state.confirm ? <button onClick={this.handleSingup}>Đăng ký</button> : <Link to="/">Đăng nhập</Link>}
                    <Link to={`/`}><button style={{width:"20%", marginLeft:"30px"}} onClick={this.handleSingup}>Trở về</button></Link>
                  </div>
                </div>
              </div>
              <div className="footer-form">
                  <button className="login-fb" onClick={this.handleButtonFb}>
                    Đăng nhập bằng 
                    <i class="fab fa-facebook-square"></i>
                    Facebook
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
