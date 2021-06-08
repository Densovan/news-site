import React from "react";
import { Row, Col, Divider } from "antd";
import { Form, Input, Button } from "antd";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiRss,
  TiMediaPlay,
} from "react-icons/ti";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <React.Fragment>
      <div className="footer-background">
        <div className="container ">
          <br></br>
          <br></br>
          <Row>
            <Col sm={24} md={8}>
              {/* <center> */}
              {/* <h1 className="logo-footer"> */}
              <img
                className="logo-footer"
                src="/assets/images/Koompi-White1.png"
              />
              {/* </h1> */}
              {/* </center> */}
            </Col>
            <Col sm={24} md={8}>
              <center className="term">
                <a className="link-footer">Term & Condition</a>
                <Divider
                  className="divider-horizental"
                  // style={{ color: "white" }}
                  type="vertical"
                />
                <a className="link-footer">Privacy Policy</a>
                <Divider
                  className="divider-horizental"
                  // style={{ color: "white" }}
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
          <Row gutter={[52, 12]}>
            <Col sm={24} md={8}>
              <h1 className="widget-title">informations</h1>
              <div className="content-footer">
                <h2>
                  <Link href="/1">News and Events</Link>
                </h2>
                <h2>
                  <Link href="/2">Ask Me Anything</Link>
                </h2>
                <h2>
                  <Link href="/3">Become a contributer</Link>
                </h2>
              </div>
            </Col>
            <Col sm={24} md={8}>
              <h1 className="widget-title">help</h1>
              <div className="content-footer">
                <h2>
                  <Link href="/4">News and Events</Link>
                </h2>
                <h2>
                  <Link href="/5">Ask Me Anything</Link>
                </h2>
                <h2>
                  <Link href="/6">Become a contributer</Link>
                </h2>
              </div>
            </Col>
            <Col sm={24} md={8}>
              <h1 className="widget-title">Newsletter Sign Up</h1>
              <div className="content-footer">
                <p className="des-footer">
                  Subscribe now and get exclusive news, interviews and stories.
                </p>
              </div>
              {/* <Form className="form-footer">
                <input
                  className="input-footer"
                  type="email"
                  placeholder="Please Enter your email"
                />
                <button className="btn-footer" type="submit">
                  <FaTelegramPlane size={20} className="icon-footer" />
                </button>
              </Form> */}
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
