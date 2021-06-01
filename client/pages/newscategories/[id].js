import React from "react";
import { useRouter } from "next/router";
import { Row, Col, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { useQuery } from "@apollo/client";
import { GET_NEWS_NEWS_BY_CAT } from "../../graphql/query";
import moment from "moment";
import Output from "editorjs-react-renderer";
import Categories from "../categories/news";
import { CubeSpinner } from "react-spinners-kit";

const AllNews = () => {
  const router = useRouter();
  const { id } = router.query;
  //=============get last News===========
  const { loading, data } = useQuery(GET_NEWS_NEWS_BY_CAT, {
    variables: { id, limit: 8, offset: 0 },
  });
  if (loading)
    return (
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
      </center>
    );

  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      <div className="container">
        <center>
          <h1 className="top-title-allNews">All News</h1>
        </center>
        <Divider></Divider>
        <Row gutter={[32, 32]}>
          <Col sm={24} md={6}>
            {/* <div className="news-cat"> */}
            <Categories />
            {/* </div> */}
          </Col>
          <Col sm={24} md={18}>
            {data.get_allnews_type_by_cat.map((res) => {
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
                      <Col xs={24} md={18}>
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
                      <Col xs={24} md={6}>
                        <button className="readmore">
                          Read More <span>&rarr;</span>
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Divider
                    style={{ marginTop: "0px", marginBottom: "10px" }}
                  ></Divider>
                </Row>
              );
            })}
            {data.get_allnews_type_by_cat == "" && (
              <center>
                <h1>No Result</h1>
              </center>
            )}
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
