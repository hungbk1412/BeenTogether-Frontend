import React, { Component } from "react";

import Login from "../components/Login";
import Banner from "../components/Banner";
import Header from "../components/Header";
import LoveHome from "../components/LoveHome";
import LoveSpace from "../components/LoveSpace";
import LoveDiary from "../components/LoveDiary";
import Footer from "../components/Footer";
import axios from "../axios";
import Loading from "../components/Loading";

export default class HomeScreen extends Component {
  state = {
    background: "rgba(47,59,77,.5)",
    bannerHeight: 0,
    headerColor: "transparent",
    homeActive: "",
    spaceActive: "",
    diaryActive: "",
    spaceHeight: 0
  }

  componentDidMount() {
    
    window.addEventListener("scroll", () => {
      if (window.scrollY > this.state.bannerHeight - 100) {
        this.setState({ headerColor: "#2f3b4d" });
      } else {
        this.setState({ headerColor: "transparent" });
      }
      if (window.scrollY > 0 && window.scrollY < this.state.bannerHeight - 100) {
        this.setState({ homeActive: "active" });
      } else {
        this.setState({ homeActive: "" });
      }
      if (window.scrollY > this.state.bannerHeight - 100 && window.scrollY < this.state.bannerHeight + this.state.spaceHeight) {
        this.setState({ spaceActive: "active" });
      } else {
        this.setState({ spaceActive: "" });
      }
      if (window.scrollY > this.state.bannerHeight + this.state.spaceHeight) {
        this.setState({ diaryActive: "active" });
      } else {
        this.setState({ diaryActive: "" });
      }
    });
  }

  updateHeight = (name, height) => {
    this.setState({ [name]: height });
  }

  updateSpaceHeight = (nameSpace, heightSpace) => {
    this.setState({ [nameSpace]: heightSpace });
  }

  render() {
    return (
      <div>
        {!this.props.username ? (
          <Login onLogin={this.props.onLogin} notiLogin={this.props.notiLogin}/>
        ) : (
            <div>{this.props.username && !this.props.loading? <div>
              <Banner updateHeight={this.updateHeight} />
              <Header 
                socket={this.props.socket}
                rela={this.props.rela}
                id={this.props.id}
                homeActive={this.state.homeActive}
                spaceActive={this.state.spaceActive}
                diaryActive={this.state.diaryActive}
                headerColor={this.state.headerColor} 
                onLogout={this.props.onLogout}
              />
              <LoveHome rela={this.props.rela} onCheckCreate={this.props.onCheckCreate} />
              {this.props.rela ? <div>
                <LoveSpace updateSpaceHeight={this.updateSpaceHeight} />
                <LoveDiary socket={this.props.socket} id={this.props.id} rela={this.props.rela} data={this.state.data} />
              </div> : <div style={{ height: "290px" }}></div>}

              {this.props.rela ? <Footer /> : <Footer background={this.state.background} />}
            </div> : <Loading />}</div>
          )}
      </div>
    );
  }
}
