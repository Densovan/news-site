import React from "react";
import { Row, Col, Button } from "antd";
import MainNavbar from "../components/Layouts/mainNavbar";
import TopStory from "./topStory";

const Index = () => {
  return (
    <React.Fragment>
      <div className="index-banner">
        <div className="content-banner">
          <Row gutter={[32, 32]}>
            <Col sm={15}>
              <div className="text-banner">
                <h1>Get the Ultimate Profit from Bitcoin.</h1>
                <p>
                  We are specializes on Blockchain Technologies, Smart
                  Contracts, Initial Coin Offering and Digital Currencies.
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
      {/* topStory */}
      <TopStory />
    </React.Fragment>
  );
};

export default Index;
