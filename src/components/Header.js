import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import config from "../config";
import avatarDefault from '../images/avatarDefault.png';
import moment from 'moment';
import ModalEachPost from "./ModalEachPost";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      modal: false,
      post: "",
      notiNumber: 0
    };
    this.toggle1 = this.toggle1.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('posts', (posts) => {
      this.props.rela ? this.props.rela.inRelationship.map(inRelationship => {
        if(inRelationship._id === this.props.id) {
          this.setState({posts: posts.slice(Math.max(posts.length-5, 1)) })
        }
      }) : console.log(" ")
    })
    
    axios.get('/api/relationships/getPostOfRela').then(data => {
      const posts = data.data.slice(Math.max(data.data.length-5, 1));
      this.setState({ posts: posts})
    }).catch(err => console.log(err))
  }

  toggle(event) {
    this.setState({
      modal: !this.state.modal,
      postId: event.target.id
    });
    axios.get(`/api/posts/${event.target.id}`).then(data => {
      this.setState({ post: data.data })
    }).catch(err => console.log(err))
  }

  toggle1() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  handleLogout = () => {
    axios
      .delete("/api/auth")
      .then(data => this.props.onLogout())
      .catch(err => console.log(err));
  };
  checkModalPost = () => {
    axios.get(`/api/posts/${this.state.post._id}`).then(data => {
      this.setState({ post: data.data })
    }).catch(err => console.log(err))
  }
  render() {
    const postsNoti = this.state.posts ? this.state.posts.map((post, index) => {
      // Tình thời gian đăng bài
      const time = moment().format("hh:mm:ss a");
      const createdAt = moment(`${post.createdAt}`).format(
        "hh:mm:ss a"
      );
      const duration = moment.duration(
        moment(`${time}`, "hh:mm:ss a").diff(moment(`${createdAt}`, "hh:mm:ss a"))
      );
      const hours = parseInt(duration.asHours());
      const minutes = parseInt(duration.asMinutes()) % 60;
      const temp = moment(`${post.createdAt}`).format("MM-DD-YYYY");
      const newtemp = moment().format("MM-DD-YYYY");
      const result = moment(`${newtemp}`).diff(`${temp}`, "days");
      return <div id={post._id} className="post-noti">
      <img id={post._id} className="ava" alt="avatar" src={post.createdBy.contentType ? `${config.rootPath}/api/users/${post.createdBy._id}/avatar` : avatarDefault}/>
      <div id={post._id}><p id={post._id}>Đã thêm kỉ niệm mới</p><span><img id={post._id} className="content" alt="" src={post.imageUrl ? `${config.rootPath}${post.imageUrl}` : ""}/></span><p id={post._id}>{result === 0
              ? hours !== 0
                ? ` ${hours}:${minutes} phút trước`
                : `${minutes} phút trước`
              : result === 1
                ? "Hôm qua lúc " + ` ${createdAt}`
                : moment(`${post.createdAt}`).format("DD-MM-YYYY") +
                ` lúc ${createdAt}`}</p>
      </div>
    </div>
    }) : ""
    return (
      <div>
        <header style={{
          background: this.props.headerColor
        }}>
          <div className="container">
            <Link className="logo f-heading" to={`/`}>
              <i className="fas fa-heartbeat" />
              lovebeat
            </Link>
            <nav>
              <ul className="f-main">
                <li>
                  <a className={this.props.homeActive} id="love-home-nav" href="#love-home">
                    LoveHome
                  </a>
                </li>
                <li>
                  <div>
                    <a className={this.props.spaceActive} id="love-space-nav" href="#love-space">
                      LoveSpace
                    </a>
                  </div>
                </li>
                <li>
                  <a className={this.props.diaryActive} id="love-diary-nav" href="#love-diary">
                    LoveDiary
                  </a>
                </li>
                <li>
                  {/* <button>LoveNotify</button> */}
                  <Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle1}>
                    <DropdownToggle color="none">
                      <p style={{color:"#ffffff"}}>LoveNotify<span style={{color:"red", fontWeight:"bold"}}>{" "}{this.state.notiNumber!==0 ? this.state.notiNumber : ""}</span></p>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.toggle}>{postsNoti[4]}</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.toggle}>{postsNoti[3]}</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.toggle}>{postsNoti[2]}</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.toggle}>{postsNoti[1]}</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.toggle}>{postsNoti[0]}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <ModalEachPost checkModalPost={this.checkModalPost} post={this.state.post} toggle={this.toggle} modal={this.state.modal} />
                </li>
                <li>
                  <button>LoveCalendar</button>
                </li>
                <li onClick={this.handleLogout}>
                  <button>LogOut</button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
