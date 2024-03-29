import React from "react";
import { Breadcrumb, Row, Col } from "antd";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Categories from "../categories/news";
import Main from "./main";
import Footer from "../../components/Layouts/footer";

const index = () => {
  return (
    <React.Fragment>
      <MainNavbar />
      <div className="container">
        <center>
          <h1 className="top-title-allNews">News</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>News</Breadcrumb.Item>
          </Breadcrumb>
        </center>
        <br></br>
        <br></br>
        <Row gutter={[12, 12]}>
          <Col xs={24} md={6}>
            <Categories />
          </Col>
          <Col xs={24} md={18}>
            <Main />
          </Col>
        </Row>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default index;
