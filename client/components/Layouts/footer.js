import React from "react";
import { Row, Col, Divider } from "antd";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiRss,
} from "react-icons/ti";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer-background">
        <div className="container ">
          <br></br>
          <Row>
            <Col sm={24} md={8}>
              <center>
                <h1 className="logo-footer">LOGO COMPANY</h1>
              </center>
            </Col>
            <Col sm={24} md={8}>
              <center className="term">
                <a className="link-footer">Term & Condition</a>
                <Divider
                  className="divider-footer"
                  //   style={{ color: "white" }}
                  type="vertical"
                />
                <a className="link-footer">Privacy Policy</a>
                <Divider
                  className="divider-footer"
                  //   style={{ color: "white" }}
                  type="vertical"
                />
                <a className="link-footer">Contact Us</a>
              </center>
            </Col>
            <Col sm={24} md={8}>
              <center className="social-footer">
                <span>
                  <TiSocialFacebook className="facebook-scial-logo" />
                </span>
                <span>
                  <TiSocialTwitter className="twitter-social-logo" />
                </span>
                <span>
                  <TiSocialLinkedin className="linkin-socail-logo" />
                </span>
                <span>
                  <TiRss style={{ fontSize: "40px", color: "#fce24a" }} />
                </span>
              </center>
            </Col>
          </Row>
        </div>
        {/* Second Navbar */}
        <Divider className="divider-footer" style={{ color: "white" }} />
        <div className="container">
          <Row gutter={[12, 12]}>
            <Col sm={24} md={8}>
              {/* <center> */}
              <h1 className="widget-title">informations</h1>
              <h2>Community</h2>
              <h2>Community</h2>
              {/* </center> */}
            </Col>
            <Col sm={24} md={8}>
              <h1 className="widget-title">Newsletter Sign Up</h1>
            </Col>
            <Col sm={24} md={8}>
              <h1 className="widget-title">help</h1>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
