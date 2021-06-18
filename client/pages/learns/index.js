import React from "react";
import { Col, Row, Breadcrumb } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  FaCoins,
  FaBusinessTime,
  FaWhmcs,
  FaChartLine,
  FaCommentAlt,
  FaLinode,
  FaRegEdit,
  FaRegClone,
} from "react-icons/fa";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_ALL_NEWS_BY_TYPE_LEARN } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import Categories from "../categories/learn";
import { CubeSpinner } from "react-spinners-kit";

const Learn = () => {
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_LEARN, {
    variables: { limit: 8, offset: 0 },
  });
  if (loading)
    return (
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
      </center>
    );

  return (
    <React.Fragment>
      {/* <TopNavbar /> */}
      <MainNavbar />
      <div className="container top-learns">
        {/* <center> */}
        {/* <h1 className="about-main-title">Learn</h1> */}
        <center>
          <h1 className="top-title-allNews">Learns</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Learns</Breadcrumb.Item>
          </Breadcrumb>
        </center>
        <br></br>
        <br></br>
        {/* </center> */}
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6}>
            <Categories />
          </Col>
          <Col xs={24} md={18}>
            <Row gutter={[12, 12]}>
              {data.get_allnews_by_type.map((res) => {
                const result = <Output data={JSON.parse(res.des)} />;
                return (
                  <Col className="content-top-stories" sm={24} md={12} lg={8}>
                    <Link href={`/detail/${res.slug}`}>
                      <div className="learn-card">
                        <div
                          className="learn-style"
                          style={{
                            backgroundImage: `url("http://localhost:3500/public/uploads//${res.thumnail}")`,
                          }}
                        ></div>
                        <div className="content-learn">
                          <h3>
                            {res.title.length <= 20
                              ? res.title
                              : res.title.substring(0, 20) + " ..."}
                          </h3>
                          <p>
                            {`${result.props.data.blocks[0].data.text.substring(
                              0,
                              50
                            )}...`}
                          </p>
                          <div className="date-avatar">
                            <div className="sub-date-avatar">
                              <img
                                className="avatar-mobile"
                                src={res.user.image}
                              />
                            </div>
                            <div>
                              <h1 className="status-news-topstory">
                                {res.types.name}
                                <span>
                                  <CaretRightOutlined
                                    style={{ fontSize: "10px" }}
                                  />
                                </span>{" "}
                                {res.categories.name}
                              </h1>
                              <p className="date-news">
                                {res.user.fullname} :{" "}
                                {moment
                                  .unix(res.createdAt / 1000)
                                  .format("DD-MM-YYYY")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Learn;
