import React from "react";
import { Row, Col, Divider, Breadcrumb } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import TopNavbar from "../components/Layouts/topNavbar";
import MainNavbar from "../components/Layouts/mainNavbar";
import Footer from "../components/Layouts/footer";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_NEWS } from "../graphql/query";
import moment from "moment";
import Output from "editorjs-react-renderer";
import Categories from "../pages/categories/news";
import { CubeSpinner } from "react-spinners-kit";

const AllNews = () => {
  //=============get last News===========
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_NEWS, {
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
      <div className="container">
        {/* <center>
          <h1 className="top-title-allNews">All News</h1>
        </center> */}
        <center>
          <h1 className="top-title-allNews">News</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>News</Breadcrumb.Item>
          </Breadcrumb>
        </center>
        <br></br>
        <br></br>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6}>
            <Categories />
          </Col>
          <Col xs={24} md={18}>
            {data.get_allnews_by_type.map((res) => {
              const result = <Output data={JSON.parse(res.des)} />;
              return (
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={24} md={8} lg={9}>
                    <div
                      className="news-topstory-style"
                      style={{
                        backgroundImage: `url("http://localhost:3500/public/uploads//${res.thumnail}")`,
                      }}
                    ></div>
                  </Col>
                  <Col xs={24} sm={24} md={16} lg={15}>
                    <h2 className="title-news">
                      {res.title.length <= 70
                        ? res.title
                        : res.title.substring(0, 70) + " ..."}
                    </h2>
                    <p>
                      {`${result.props.data.blocks[0].data.text.substring(
                        0,
                        120
                      )}...`}
                    </p>
                    <Row>
                      <Col xs={17} md={18}>
                        <h1 className="status-news-topstory">
                          {res.types.name}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          {res.categories.name}
                        </h1>
                        <p className="date-news">
                          {res.user.fullname}:{" "}
                          {moment
                            .unix(res.createdAt / 1000)
                            .format("DD-MM-YYYY")}
                        </p>
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
                  <Divider
                    style={{ marginTop: "0px", marginBottom: "10px" }}
                  ></Divider>
                </Row>
              );
            })}
          </Col>
        </Row>
        <br></br>
        <br></br>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AllNews;
