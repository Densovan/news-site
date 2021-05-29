import React from "react";
import { Row, Col, Divider } from "antd";
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
import TopNavbar from "../components/Layouts/topNavbar";
import MainNavbar from "../components/Layouts/mainNavbar";
import Footer from "../components/Layouts/footer";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_NEWS } from "../graphql/query";
import moment from "moment";
import Output from "editorjs-react-renderer";

const AllNews = () => {
  //=============get last News===========
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_NEWS, {
    variables: { limit: 8, offset: 0 },
  });
  if (loading) return null;
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
            <div className="news-cat">
              <h2 className="title-cat">Categories</h2>
              <div
                className="scroll-newscate"
                // style={{
                //   width: "300px",
                //   border: "1px solid rgba(4, 47, 130, 0.3)",
                //   padding: "0 !important",
                // }}
              >
                <div>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaBusinessTime
                          size={20}
                          style={{ marginRight: "7px" }}
                        />
                        Business
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaCoins size={20} style={{ marginRight: "7px" }} />
                        Coin
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaWhmcs size={20} style={{ marginRight: "7px" }} />
                        Technology
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        <FaChartLine size={20} style={{ marginRight: "7px" }} />
                        Maket
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        <FaCommentAlt
                          size={18}
                          style={{ marginRight: "7px" }}
                        />
                        Options
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaRegClone size={20} style={{ marginRight: "7px" }} />
                        Our Company
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        <FaLinode size={18} style={{ marginRight: "7px" }} />
                        DeFi
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaRegEdit size={20} style={{ marginRight: "7px" }} />
                        Editor's Pick
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={24} md={18}>
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
