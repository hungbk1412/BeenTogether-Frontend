import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className="container text-center">
        <div class="lds-hourglass" style={{marginTop: "300px"}}></div>
      </div>
    )
  }
}
