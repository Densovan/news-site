import React from "react";
import { Col, Row, Breadcrumb } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_FEATURE } from "../../graphql/query";
import Link from "next/link";
import moment from "moment";
import Output from "editorjs-react-renderer";
import { CubeSpinner } from "react-spinners-kit";
import Categories from "../categories/feature";

const Learn = () => {
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_FEATURE, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading)
    return (
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
        {/* <p>Loading...</p> */}
      </center>
    );
  console.log(data);
  return (
    <React.Fragment>
      {/* <TopNavbar /> */}
      <MainNavbar />
      <div className="container top-learns">
        {/* <center>
          <h1 className="about-main-title">Feature</h1>
        </center> */}
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
            <Row gutter={[12, 12]}>
              {data.get_allnews_by_type.map((res) => {
                const result = <Output data={JSON.parse(res.des)} />;
                return (
                  <Col sm={24} md={12} lg={8}>
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
                          <Row>
                            <Col xs={24} md={16}>
                              <h1 className="status-news-topstory">
                                {res.types.name}
                                <span>
                                  <CaretRightOutlined
                                    style={{ fontSize: "10px" }}
                                  />
                                </span>{" "}
                                {res.categories.name}
                              </h1>
                              <p className="date-learn ">
                                {res.user.fullname} :{" "}
                                {moment
                                  .unix(res.createdAt / 1000)
                                  .format("DD-MM-YYYY")}
                              </p>
                            </Col>
                            <Col xs={24} md={8}>
                              {/* <button className="readmore-learn">
                              Read More <span>&rarr;</span>
                            </button> */}
                            </Col>
                          </Row>
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
