import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Layout,
  Spin,
  Card,
  Avatar,
  Tooltip,
  Input,
  Typography,
  Tag,
  Divider,
  Button,
} from "antd";
import parse from "html-react-parser";
import {
  CaretRightOutlined,
  HeartOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_NEWS, GET_USER } from "../../graphql/query";
import moment from "moment";
import Output from "editorjs-react-renderer";
import Medium from "../../components/loaders/newsLoader";
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
  const { loading: userLoading, data: userData } = useQuery(GET_USER);
  if (loading || userLoading)
    return (
      <div>
        <Medium />
      </div>
    );
  const news = [];
  news.push(data.get_all_news_by_type_news);
  return (
    <React.Fragment>
      <Row>
        <Col span={2}>
          <Avatar
            style={{
              height: 40,
              width: 40,
              paddingTop: 0,
              // marginLeft: 18,
              cursor: "pointer",
              border: "solid 2px #ffffff9d",
            }}
            // src={userData.get_user.image}
            shape="circle"
            size="large"
          />
        </Col>
        <Col span={22}>
          <Link href="/dashboard/addstory">
            <Input size="large" placeholder="Write your story" />
          </Link>
        </Col>
      </Row>
      <br></br>
      <div className="content-top-stories">
        {data.get_all_news_by_type_news.map((res, index) => {
          // const result = <Output data={JSON.parse(res.des)} />;
          return (
            <div key={index}>
              <Card className="card-article">
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
                        {res.title.length <= 50
                          ? res.title
                          : res.title.substring(0, 50) + " ..."}
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
            </div>
          );
        })}
        <InfiniteScroll
          dataLength={data.get_all_news_by_type_news.length}
          next={async () => {
            await fetchMore({
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
