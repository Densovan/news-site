import React from "react";
import { Col, Row, Breadcrumb } from "antd";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import Categories from "../categories/learn";
import Main from "./main";

const main = () => {
  return (
    <React.Fragment>
      <MainNavbar />
      <div className="container top-learns">
        <center>
          <h1 className="top-title-allNews">Learns</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Learns</Breadcrumb.Item>
          </Breadcrumb>
        </center>
        <br></br>
        <br></br>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6}>
            <Categories />
          </Col>
          <Col xs={24} md={18}>
            <Main />
          </Col>
        </Row>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default main;
