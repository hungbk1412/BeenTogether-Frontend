import React, { Component } from 'react'
import axios from '../axios';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {}

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  login = () => {
    this.props.onLogin(this.state.username, this.state.password)
  }

  render() {
    return (
      <div id="login">
        <div className="container">
          <div className="login-container f-main">
            <div className="form-banner">
              <div className="snow"></div>
              <div className="snow"></div>
              <div className="snow"></div>
              <div className="snow"></div>
            </div>
            <div class="form" ref={(bannerForm) => this.divRef = bannerForm}>
              <div className="login-title">
                <a className="logo f-heading" href="/">
                  <i className="fas fa-heartbeat"></i>
                  lovebeat
                </a>
                <p>Đăng nhập</p>
              </div>
              <div className="main-form">
                <div className="username-container">
                  <label>Tên tài khoản</label>
                  <input onChange={ this.onChangeUsername } type="text" name="username" placeholder="Tên tài khoản" required />
                </div>

                <div className="password-container">
                  <label>Mật khẩu</label>
                  <input onChange={ this.onChangePassword } type="password" name="password" placeholder="Mật khẩu" required />
                </div>
                <p style={{color:"red"}}>{this.props.notiLogin}</p>
                <div className="submit-container"><button onClick={ this.login } >Đăng nhập</button></div>
              </div>
              <div className="footer-form">
                <p>
                  Bạn chưa có tài khoản?
                  <Link to={`/signup`} className="open-signup">Đăng ký</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
