import React, { useState, Fragment } from "react";
import { Row, Col, Layout, Spin, Card, Avatar, Tooltip, Result } from "antd";
import parse from "html-react-parser";
import {
  CaretRightOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS } from "../../graphql/query";
import moment from "moment";
import Medium from "../../components/loaders/newsLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const { Content } = Layout;

const AllNews = ({ selectedTags, loadingFilter }) => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [hasMoreItems, setHasMoreItems] = useState(true);
  //=============get last News===========
  const {
    loading,
    data: news,
    fetchMore,
  } = useQuery(GET_ALL_NEWS, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading)
    return (
      <div>
        <Medium />
      </div>
    );
  const result = [];
  if (!loadingFilter) {
    if (selectedTags.length === 0) {
      news.get_all_news.map((news) => {
        result.push(news);
      });
    } else {
      let selectedTag = [];
      selectedTags.forEach(element => {
        if (element === "All") {
          selectedTag.push(element)
        }
      });
      if (selectedTag[0] == "All") {
        news.get_all_news.map((news) => {
        result.push(news);
        })
      }
      else{
        news.get_all_news.filter((news) => {
          return selectedTags.map((selectedTag) => {
            if (
              news.categories.name === selectedTag ||
              news.types.name === selectedTag
            ) {
              result.push(news);
            }
          });
        });
      }
    }
  }
  return (
    <>
      {loadingFilter ? (
        <div>
          {" "}
          <Medium />{" "}
        </div>
      ) : (
        <Fragment>
          {result.length === 0 && (
            <div>
              <Result
                status="404"
                title="No Data"
                subTitle="Sorry, You can find this data."
              />
            </div>
          )}
          {result.map((res, index) => {
            return (
              <Card className="card-article" key={index}>
                <Row>
                  <Col md={16} className="box-news">
                    <div className="header-card-article">
                      <Avatar src={res.user.image} />
                      <div className="profile-name-time">
                        <Tooltip
                          placement="right"
                          title={
                            <div style={{ padding: 8 }}>
                              <div className="header-card-article">
                                <Avatar src={res.user.image} />
                                <div
                                  className="card-name"
                                  style={{ marginLeft: 4 }}
                                >
                                  {res.user.fullname}
                                </div>
                              </div>
                              <div style={{ paddingTop: 4 }}>
                                {res.user.bio}
                              </div>
                            </div>
                          }
                          className="card-name"
                        >
                          <li style={{ cursor: "pointer" }}>
                            {res.user.fullname}
                          </li>
                        </Tooltip>
                        <li className="news-name">
                          {moment
                            .unix(res.createdAt / 1000)
                            .format("DD-MM-YYYY")}
                        </li>
                      </div>
                    </div>
                    <div className="news-content">
                      <div className="title-text-card">
                        {res.title.length <= 70
                          ? res.title
                          : res.title.substring(0, 70) + " ..."}
                      </div>
                      <div className="text-content-card">
                        {parse(
                          res.des.length <= 120
                            ? res.des
                            : res.des.substring(0, 100) + "..."
                        )}
                      </div>
                    </div>
                    <div className="news-footer">
                      <div>
                        <button className="type-category">
                          {res.types.name}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          {res.categories.name}
                        </button>
                        <Link href={`/detail/${res.slug}`}>
                          <button className="readmore">
                            Read More <span>&rarr;</span>
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button className="btn-news">
                          <LikeOutlined style={{ fontSize: "18px" }} />
                        </button>
                        <button className="btn-news">
                          <DislikeOutlined style={{ fontSize: "18px" }} />
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="img-news">
                      <img
                        height="100%"
                        width="200"
                        src={`${URL_ACCESS}/public/uploads//${res.thumnail}`}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            );
          })}
          <InfiniteScroll
            dataLength={news.get_all_news.length}
            next={async () => {
              await fetchMore({
                variables: {
                  offset: news.get_all_news.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;

                  if (fetchMoreResult.get_all_news.length < 8) {
                    setHasMoreItems(false);
                  }

                  return Object.assign({}, prev, {
                    get_all_news: [
                      ...prev.get_all_news,
                      ...fetchMoreResult.get_all_news,
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
        </Fragment>
      )}
    </>
  );
};

export default AllNews;
