import React, { Component } from 'react'

class Footer extends Component {
  render() {
    const backgroundStyle = this.props.background ? this.props.background : "";
    return (
      <div>
        <footer style={{ background: backgroundStyle }}>
          <div className="container f-main">
            <div className="copyright">Copyright © 2019 LoveBeat Design by TQH</div>
            <div className="author-info">
              <div className="box">
                <div className="icon-contact">
                  <i className="fas fa-map-marker-alt"></i>
                  Our Location
                    </div>
                <div className="detail">Hanoi</div>
              </div>
              <div className="box">
                <div className="icon-contact">
                  <i className="fas fa-phone-volume"></i>
                  Call Us
                    </div>
                <div className="detail">+84 969 988 524</div>
              </div>
              <div className="box">
                <div className="icon-contact">
                  <i className="fas fa-envelope"></i>
                  Write Us
                    </div>
                <div className="detail">beentogether.project</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer;