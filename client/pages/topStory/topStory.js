import React from "react";
import parse from "html-react-parser";
import { Row, Col, Button, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_NEWS } from "../../graphql/query";
import Link from "next/link";
import moment from "moment";
import Output from "editorjs-react-renderer";
import Learn from "../learns/learn";
import Feature from "../features/feature";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { CubeSpinner } from "react-spinners-kit";
import ContentLoader from "react-content-loader";

const TopStory = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;
  //=============get last News===========
  const { loading: loadingLastNews, data: dataLastNews } = useQuery(
    GET_ALL_NEWS_BY_TYPE_NEWS,
    {
      variables: { limit: 8, offset: 0 },
    }
  );
  if (loadingLastNews)
    return (
      <div className="container">
        <ContentLoader viewBox="0 0 100% 650" height={650} width={"100%"}>
          <rect x="0" y="42" rx="5" ry="5" width="100%" height="200" />
          <rect x="0" y="265" rx="5" ry="5" width="100%" height="10" />
          <rect x="0" y="285" rx="5" ry="5" width="100%" height="10" />
          <rect x="0" y="305" rx="5" ry="5" width="100%" height="10" />
        </ContentLoader>
      </div>
    );

  const LastNews = () => {
    return (
      <div>
        <Row>
          <Col sm={24}>
            {dataLastNews.get_all_news_by_type_news
              .slice(0, 1)
              .map((res, index) => {
                return (
                  <div key={index} className="lasts-news-card">
                    <div
                      className="lasts-news-style"
                      style={{
                        backgroundImage: `url(${URL_ACCESS}/public/uploads//${res.thumnail})`,
                      }}
                    ></div>
                    <div className="content-lasts-news">
                      <h1 className="title-news">
                        {res.title.length <= 70
                          ? res.title
                          : res.title.substring(0, 70) + " ..."}
                      </h1>

                      <Row>
                        <Col xs={12} md={18}>
                          <div className="date-avatar-learn">
                            <div className="sub-date-avatar">
                              <Link
                                href={`/profile_detial/${
                                  res.user.id
                                }#${res.user.fullname
                                  .replace(
                                    /[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g,
                                    "-"
                                  )
                                  .toLowerCase()}`}
                              >
                                <img
                                  className="avatar-mobile"
                                  src={res.user.image}
                                />
                              </Link>
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
                              <p className="data-last-news">
                                {res.user.fullname} :{" "}
                                {moment
                                  .unix(res.createdAt / 1000)
                                  .format("DD-MM-YYYY")}
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <Link href={`/detail/${res.slug}`}>
                            <button className="readmore-last-news">
                              Read More <span>&rarr;</span>
                            </button>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })}
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <React.Fragment>
      {/* <TopNavbar /> */}
      {/* <MainNavbar /> */}
      {/* <div className="index-banner">
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
      </div> */}
      <div className="container">
        <Row gutter={[32, 32]}>
          <Col sm={24} md={24} lg={17}>
            <br></br>
            <h1 className="top-title">Top Stories</h1>
            {/*======================= The last news =================== */}
            <LastNews />

            {dataLastNews.get_all_news_by_type_news
              .slice(1, 5)
              .map((res, index) => {
                // const result = <Output data={JSON.parse(res.des)} />;
                return (
                  <div
                    key={index}
                    className="content-top-stories"
                    style={{ marginTop: "12px" }}
                  >
                    <Row gutter={[12, 12]}>
                      <Col xs={24} sm={24} md={8} lg={9}>
                        <div
                          className="news-topstory-style"
                          style={{
                            backgroundImage: `url(${URL_ACCESS}/public/uploads//${res.thumnail})`,
                          }}
                        ></div>
                      </Col>
                      <Col xs={24} sm={24} md={16} lg={15}>
                        <div className="title-news-div">
                          <h2 className="title-news">
                            {res.title.length <= 60
                              ? res.title
                              : res.title.substring(0, 60) + " ..."}
                          </h2>
                        </div>
                        {/* <p className="describe-style">
                          {`${result.props.data.blocks[0].data.text.substring(
                            0,
                            120
                          )}...`}
                        </p> */}
                        <div className="describe-style">
                          {parse(
                            res.des.length <= 120
                              ? res.des
                              : res.des.substring(0, 120) + "..."
                          )}
                        </div>

                        <Row>
                          <Col xs={17} md={18}>
                            <div className="date-avatar">
                              <div className="sub-date-avatar">
                                <Link
                                  href={`/profile_detial/${
                                    res.user.id
                                  }#${res.user.fullname
                                    .replace(
                                      /[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g,
                                      "-"
                                    )
                                    .toLowerCase()}`}
                                >
                                  <img
                                    className="avatar-mobile"
                                    src={res.user.image}
                                  />
                                </Link>
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
                          </Col>
                          <Col xs={7} md={6}>
                            <Link href={`/detail/${res.slug}`}>
                              <button className="readmore">
                                Read More <span>&rarr;</span>
                              </button>
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                      <Divider style={{ margin: "0px" }}></Divider>
                    </Row>
                  </div>
                );
              })}
            <h3 className="all-news-btn">
              <Link href="/news">
                <a>
                  All News <span>&rarr;</span>
                </a>
              </Link>
            </h3>
          </Col>
          <Col sm={24} md={24} lg={7}>
            <Learn />
          </Col>
        </Row>
        <Feature />
        <br></br>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TopStory;
