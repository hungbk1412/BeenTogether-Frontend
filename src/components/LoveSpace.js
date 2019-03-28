import React, { Component } from "react";
import { Link } from 'react-router-dom';

import testAva from '../images/bg.jpg';
import axios from "../axios";
import config from "../config";
import moment from 'moment'
import avatarDefault from '../images/avatarDefault.png'

class LoveSpace extends Component {
  state={
    rela: ""
  }
  componentDidMount() {
    this.props.updateSpaceHeight('spaceHeight', this.divRef.clientHeight);
    axios.get('/api/relationships/getRelaForUser').then(data => {
      this.setState({ rela: data.data })
      this.setState({ curTime: moment() })
    }).catch(err => console.log(err))
  }
  render() {
    const images = this.state.rela ? this.state.rela.inRelationship.map(inRelationship => 
      <Link key={inRelationship._id} to={`/${inRelationship._id}/profile`}>{inRelationship.contentType ? <img alt="" src={`${config.rootPath}/api/users/${inRelationship._id}/avatar`}/> : <img alt="" src={avatarDefault}/> }</Link>
      ) : ""
    const username = this.state.rela ? this.state.rela.inRelationship.map(inRelationship => 
        <p>{inRelationship.username}</p>
      ) : ""
    // Tính ngày
    const startTime = moment(`${this.state.rela.startTime}`, "YYYY-MM-DD").format(
      "MM-DD-YYYY"
    );
    const togetherDay = moment(`${this.state.curTime}`).diff(
      `${startTime}`,
      "days"
    );
    return (
      <div id="love-space" ref={(spaceElem) => this.divRef = spaceElem}>
        <div className="love-title f-main">
          <h1>LoveSpace</h1>
        </div>
        <div className="container f-main">
          <div className="avatar">
            {images}
          </div>
          <div className="space-info">
            <div className="user-fullname">
              {username[0]}
              <i className="fas fa-heartbeat" />
              {username[1]}
            </div>
            <div className="space">
              <p>{togetherDay} ngày yêu</p>
              <p>Online 3 giờ 40 phút trước</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoveSpace;
