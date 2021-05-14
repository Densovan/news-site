import React from "react";
import { Row, Col, Button } from "antd";
import MainNavbar from "../components/Layouts/mainNavbar";
import TopStory from "../pages/topStory/topStory";
import Learn from "../pages/Learn/learn";
import Feature from "./Feature/feature";

const Index = () => {
  return (
    <React.Fragment>
      <div className="index-banner">
        <div className="content-banner">
          <Row gutter={[32, 32]}>
            <Col sm={15}>
              <div className="text-banner">
                <h1>KOOMPI is your starting computing.</h1>
                <p>
                  As compact as the E13, but lighter. No compromise on
                  open-source performance. Perfect for students on the go
                </p>
                <button className="btn-banner">Get Start</button>
              </div>
            </Col>
            <Col sm={9}>
              <img className="banner-right-img" src="/assets/images/man.png" />
            </Col>
          </Row>
        </div>
      </div>
      <div className="container">
        <Row gutter={[32, 32]}>
          <Col sm={17}>
            <TopStory />
          </Col>
          <Col sm={7}>
            <Learn />
          </Col>
        </Row>
        <Feature />
      </div>
    </React.Fragment>
  );
};

export default Index;
