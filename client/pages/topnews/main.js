import React, { useState, Fragment, useContext } from "react";
import {
  Row,
  Col,
  Layout,
  Spin,
  Card,
  Avatar,
  Tooltip,
  Result,
  Input,
} from "antd";
import parse from "html-react-parser";
import { CaretRightOutlined } from "@ant-design/icons";
import { AiOutlinePicture, AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_NEWS_TOP,
  GET_USER,
  GET_LIKE_COUNT_DOWN,
} from "../../graphql/query";
import moment from "moment";
import Medium from "../../components/loaders/newsLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallNavbar from "../../components/Layouts/smallNavbar";
import AuthContext from "../../contexts/authContext";
import NewLike from "../../components/common/news.like";

const { Content } = Layout;

const AllNews = ({ selectedTags, loadingFilter }) => {
  const { loggedIn } = useContext(AuthContext);
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
  } = useQuery(GET_ALL_NEWS_TOP, {
    variables: { limit: 6, offset: 0 },
    pollInterval: 1000,
  });
  const { loading: userLoading, data: userData } = useQuery(GET_USER);
  const { data: like_count_down, loading: like_count_down_loading } =
    useQuery(GET_LIKE_COUNT_DOWN);
  if (loading || userLoading || like_count_down_loading)
    return (
      <div>
        <Medium />
      </div>
    );
  const result = [];
  if (!loadingFilter) {
    if (selectedTags.length === 0) {
      news.get_all_news_top.map((news) => {
        result.push(news);
      });
    } else {
      let selectedTag = [];
      selectedTags.forEach((element) => {
        if (element === "All") {
          selectedTag.push(element);
        }
      });
      if (selectedTag[0] == "All") {
        news.get_all_news_top.map((news) => {
          result.push(news);
        });
      } else {
        news.get_all_news_top.filter((news) => {
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
    <React.Fragment>
      {loggedIn === true && (
        <Row className="status-style">
          <Col span={2}>
            <center>
              <Avatar
                style={{
                  height: 35,
                  width: 35,
                  // paddingTop: 0,
                  // marginLeft: 18,
                  cursor: "pointer",
                  border: "solid 2px #ffffff9d",
                }}
                src={userData.get_user.image}
                shape="circle"
                // size="large"
              />
            </center>
          </Col>
          <Col span={22}>
            <Link href="/dashboard/addstory">
              <Input size="middle" placeholder="Write your story" />
            </Link>
          </Col>
          {/* <Col span={4}>
          <div className="icon-small-navbar">
            <div className="icon1-small-navbar">
              <Link href="/dashboard/addstory">
                <AiOutlinePicture size={20} />
              </Link>
            </div>
            <div className="icon1-small-navbar">
              <Link href="/dashboard/addstory">
                <AiOutlineLink size={20} />
              </Link>
            </div>
          </div>
        </Col> */}
        </Row>
      )}
      <SmallNavbar />
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
                  <Col xs={24} md={16} className="box-news">
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
                          res.des.length <= 70
                            ? res.des
                            : res.des.substring(0, 70) + "..."
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
                      <NewLike
                        postId={res.id}
                        ownerId={res.user.id}
                        likeCount={res.like_count}
                        like_count_down={like_count_down}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div
                      className="image-news-style"
                      style={{
                        backgroundImage: `url(${URL_ACCESS}/public/uploads//${res.thumnail})`,
                      }}
                    >
                      {/* <img
                        height="100%"
                        width="200"
                        src={`${URL_ACCESS}/public/uploads//${res.thumnail}`}
                      /> */}
                    </div>
                  </Col>
                </Row>
              </Card>
            );
          })}
          <InfiniteScroll
            dataLength={news.get_all_news_top.length}
            next={async () => {
              await fetchMore({
                variables: {
                  offset: news.get_all_news_top.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;

                  if (fetchMoreResult.get_all_news_top.length < 6) {
                    setHasMoreItems(false);
                  }

                  return Object.assign({}, prev, {
                    get_all_news: [
                      ...prev.get_all_news_top,
                      ...fetchMoreResult.get_all_news_top,
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
    </React.Fragment>
  );
};

export default AllNews;
