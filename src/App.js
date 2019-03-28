import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import config from "./config";
import "bootstrap/dist/css/bootstrap.min.css";
import io from 'socket.io-client';

import HomeScreen from "./containers.js/HomeScreen";
import SignUp from "./components/SignUp";
import Profile from './components/Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.socket = io(config.rootPath)
  }

  componentDidMount() {
    // console.log(this.socket)
    this.setState({ loading: true })
    axios
      .get("/api/auth/login")
      .then(data => {
        this.setState({ username: data.data.username, id: data.data.id });
        setTimeout(
          function() {
            this.setState({ loading: false })
          }.bind(this),
          1000
        );
      })
      .catch(err => console.log(err));
      axios.get('/api/relationships/getRelaForUser').then(data => {
        this.setState({ rela: data.data })
      }).catch(err => console.log(err))
  }

  onLogin = (username, password) => {
    this.setState({ loading: true })
    axios
      .post("/api/auth", {
        username: username,
        password: password
      })
      .then(data => {
        data
          ? this.setState({ username: data.data.username, id: data.data.id })
          : console.log("sai tai khoan");
          axios.get('/api/relationships/getRelaForUser').then(data => {
            this.setState({ rela: data.data })
            setTimeout(
              function() {
                this.setState({ loading: false })
              }.bind(this),
              2000
            );
          }).catch(err => console.log(err))
      })
      .catch(err => this.setState({ notiLogin: "Tài khoản không đúng" }));

  };

  onLogout = () => {
    this.setState({ username: null, id: null })
  }

  onCheckSignup = (username, id) => {
    this.setState({ username: username, id: id })
  }

  onCheckCreate = () => {
    axios.get('/api/relationships/getRelaForUser').then(data => {
      this.setState({ rela: data.data })
    }).catch(err => console.log(err))
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            exact
            path="/"
            render={props => {
              return (
                <HomeScreen
                  {...props}
                  onLogin={this.onLogin}
                  username={this.state.username}
                  id={this.state.id}
                  rela={this.state.rela}
                  onLogout={this.onLogout}
                  onCheckCreate={this.onCheckCreate}
                  loading={this.state.loading}
                  notiLogin={this.state.notiLogin}
                  socket={this.socket}
                />
              );
            }}
          />
          <Route path="/signup" render={props => {
            return (
              <SignUp onCheckSignup={this.onCheckSignup} {...props}/>
            )
          }} />
          <Route path="/:id/profile" render={props => {
            return <Profile {...props} relaId={this.state.rela ? this.state.rela._id : ""} userId={this.state.id}/>
             
          }}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
