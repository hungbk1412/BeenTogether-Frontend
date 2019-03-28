import React, { Component } from 'react'

class Banner extends Component {
  componentDidMount() {
    this.props.updateHeight('bannerHeight', this.divRef.clientHeight);
  }
  render() {
    return (
      <div id="banner" ref={(bannerElem) => this.divRef = bannerElem}>
        <div className="bg-wave"></div>
        <div className="snow"></div>
        <div className="snow"></div>
        <div className="snow"></div>
        <div className="snow"></div>
      </div>
    )
  }
}

export default Banner;