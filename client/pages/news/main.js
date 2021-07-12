import React, { useState } from "react";
import { Row, Col, Divider, Layout, Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_NEWS } from "../../graphql/query";
import moment from "moment";
import Output from "editorjs-react-renderer";
import Loader from "../../components/loaders/laoder";
import InfiniteScroll from "react-infinite-scroll-component";

const { Content } = Layout;

const AllNews = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [hasMoreItems, setHasMoreItems] = useState(true);
  //=============get last News===========
  const { loading, data, fetchMore } = useQuery(GET_ALL_NEWS_BY_TYPE_NEWS, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <React.Fragment>
      <div className="content-top-stories">
        {data.get_all_news_by_type_news.map((res, index) => {
          const result = <Output data={JSON.parse(res.des)} />;
          return (
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
                <h2 className="title-news">
                  {res.title.length <= 70
                    ? res.title
                    : res.title.substring(0, 70) + " ..."}
                </h2>
                <p className="describe-style">
                  {`${result.props.data.blocks[0].data.text.substring(
                    0,
                    120
                  )}...`}
                </p>
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
                          <img className="avatar-mobile" src={res.user.image} />
                        </Link>
                      </div>
                      <div>
                        <h1 className="status-news-topstory">
                          {res.types.name}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
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
              <Divider
                style={{ marginTop: "0px", marginBottom: "10px" }}
              ></Divider>
            </Row>
          );
        })}
        <InfiniteScroll
          dataLength={data.get_all_news_by_type_news.length}
          next={async () => {
            fetchMore({
              variables: {
                offset: data.get_all_news_by_type_news.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                if (fetchMoreResult.get_all_news_by_type_news.length < 8) {
                  setHasMoreItems(false);
                }

                return Object.assign({}, prev, {
                  get_all_news_by_type_news: [
                    ...prev.get_all_news_by_type_news,
                    ...fetchMoreResult.get_all_news_by_type_news,
                  ],
                });
              },
            });
          }}
          hasMore={hasMoreItems}
          loader={
            <Content style={{ marginTop: "15px" }}>
              <center>
                <Spin></Spin>
              </center>
            </Content>
          }
          endMessage={null}
        ></InfiniteScroll>
      </div>
    </React.Fragment>
  );
};

export default AllNews;
