import React from "react";
import { Breadcrumb, Row, Col } from "antd";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Categories from "../categories/news";
import Main from "./main";
import Footer from "../../components/Layouts/footer";
import GlobalHeader from "../../components/Layouts/globalHeader";

const index = () => {
  return (
    <React.Fragment>
      {/* <MainNavbar /> */}
      <GlobalHeader />
      <div className="container">
        {/* <center>
          <h1 className="top-title-allNews">News</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>News</Breadcrumb.Item>
          </Breadcrumb>
        </center> */}
        <br></br>
        <br></br>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Main />
          </Col>
          <Col xs={24} md={8}>
            <Categories />
          </Col>
        </Row>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default index;
