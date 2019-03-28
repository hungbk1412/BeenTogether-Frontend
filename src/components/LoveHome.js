import React, { Component } from "react";
import moment from "moment";
import axios from "../axios";
import ModalNewRela from "./ModalNewRela";

class LoveHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    axios
      .get("/api/relationships/getRelaForUser")
      .then(data => {
        this.setState({ data: data.data });
        this.setState({ startTime: data.data.startTime });
        this.setState({ curTime: moment() });
      })
      .catch(err => console.log(err));
  }

  onCheckRela = () => {
    axios
      .get("/api/relationships/getRelaForUser")
      .then(data => {
        this.setState({ data: data.data });
        this.setState({ startTime: data.data.startTime });
        this.setState({ curTime: moment() });
      })
      .catch(err => console.log(err));
  }
  render() {
    // Xử lý Start Time
    const startTime = this.state.startTime
      ? moment(`${this.state.startTime}`, "YYYY-MM-DD")
      : console.log("err");
    const resultStartTime = moment(`${startTime}`);
    const startTimeArray = moment(resultStartTime)
      .toArray()
      .slice(0, 3);
    // Tính ngày
    const startTime2 = moment(`${this.state.startTime}`, "YYYY-MM-DD").format(
      "MM-DD-YYYY"
    );
    const togetherDay = moment(`${this.state.curTime}`).diff(
      `${startTime2}`,
      "days"
    );
    const surPlus = togetherDay % 100;
    const coming = (togetherDay - surPlus ) + 100;
    const plusDay = 100 - surPlus;
    const temp = moment(`${this.state.curTime}`)
    const comingDay = temp.add(plusDay,'days').calendar();
    const resultComingDay = comingDay.split('/');
    return (
      <div id="love-home" className="f-main">
        <div className="container">
          <div className="love-home1">
            {this.state.data ? (
              <div className="balloon">
                <p className="now-count">{togetherDay}</p>
                <p className="coming-count">+{plusDay}</p>
                <div className="heart-beat">
                  <i className="fas fa-burn" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="love-home2">
            {this.state.data ? (
              <div className="balloon">
                <p className="start-time">
                  Ngày {startTimeArray[2]} thg {startTimeArray[1] + 1},{" "}
                  {startTimeArray[0]}
                </p>
              </div>
            ) : (
              ""
            )}
            {this.state.data ? (
              <div className="balloon">
                <p className="coming">{coming} Anniversary</p>
                <p className="coming-day">Ngày {resultComingDay[1]} thg {resultComingDay[0]}, {resultComingDay[2]}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* Nếu chưa có người dùng */}
        {!this.props.rela  ? (
          <div className="open-new-rela f-main">
            <button onClick={this.toggle} className="f-main">Tạo hoặc Tham gia vào một mối quan hệ</button>
            <ModalNewRela onCheckCreate={this.props.onCheckCreate} onCheckRela={this.onCheckRela} toggle={this.toggle} modal={this.state.modal}/>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default LoveHome;
