import React from "react";
import { Col, Row, Breadcrumb } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_FEATURE } from "../../graphql/query";
import { CubeSpinner } from "react-spinners-kit";
import Categories from "../categories/feature";
import Main from "./main";
import GlobalHeader from "../../components/Layouts/globalHeader";

const Learn = () => {
  return (
    <React.Fragment>
      {/* <MainNavbar /> */}
      <GlobalHeader />
      <div className="container top-learns">
        <center>
          <h1 className="top-title-allNews">Features</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Features</Breadcrumb.Item>
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

export default Learn;
