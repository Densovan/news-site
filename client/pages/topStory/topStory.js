import React from "react";
import { Row, Col, Button, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_NEWS } from "../../graphql/query";
import Link from "next/link";
import moment from "moment";
import Output from "editorjs-react-renderer";

const TopStory = () => {
  //=============get last News===========
  const { loading: loadingLastNews, data: dataLastNews } = useQuery(
    GET_ALL_NEWS_BY_TYPE_NEWS,
    {
      variables: { limit: 8, offset: 0 },
    }
  );
  if (loadingLastNews) return null;

  const LastNews = () => {
    return (
      <div>
        <Row>
          <Col sm={24}>
            {dataLastNews.get_allnews_by_type.slice(0, 1).map((res) => {
              return (
                <div className="lasts-news-card">
                  <div
                    className="lasts-news-style"
                    style={{
                      backgroundImage: `url("http://localhost:3500/public/uploads//${res.thumnail}")`,
                    }}
                  ></div>
                  <div className="content-lasts-news">
                    <h1 className="title-news">
                      {res.title.length <= 70
                        ? res.title
                        : res.title.substring(0, 70) + " ..."}
                    </h1>

                    <Row>
                      <Col sm={24} md={18}>
                        <h1 className="status-news-topstory">
                          {res.types.name}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          {res.categories.name}
                        </h1>
                        <p className="data-last-news">
                          {res.user.fullname} :{" "}
                          {moment
                            .unix(res.createdAt / 1000)
                            .format("DD-MM-YYYY")}
                        </p>
                      </Col>
                      <Col sm={24} md={6}>
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
    <div>
      <br></br>
      <h1 className="top-title">Top Stories</h1>
      {/*======================= The last news =================== */}
      <LastNews />

      {dataLastNews.get_allnews_by_type.slice(1, 5).map((res) => {
        const result = <Output data={JSON.parse(res.des)} />;
        return (
          <div style={{ marginTop: "12px" }}>
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
                      </span>
                      {res.categories.name}
                    </h1>
                    <p className="date-news">
                      {res.user.fullname}:{" "}
                      {moment.unix(res.createdAt / 1000).format("DD-MM-YYYY")}
                    </p>
                  </Col>
                  <Col xs={24} md={6}>
                    <Link href="/">
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
      <br></br>
      <br></br>
      {/* <h3 className="all-news-btn">
        <Link href="/news">
          <a>
            All News <span>&rarr;</span>
          </a>
        </Link>
      </h3> */}
    </div>
  );
};

export default TopStory;
