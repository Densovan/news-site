import React, { useState } from "react";
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
  Tag,
  Popconfirm,
  Divider,
  Empty,
} from "antd";
import parse from "html-react-parser";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_OWN_NEWS,
  GET_VOTE_UP_DOWN,
  GET_ALL_VOTE_UP_DOWN,
} from "../../graphql/query";
import { DELETE_NEWS } from "../../graphql/mutation";
import { BsTrash, BsPencil } from "react-icons/bs";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import NewLike from "../../components/common/news.like";
import Profile from "./profile";
import Footer from "../../components/Layouts/footer";

const { Content } = Layout;

const AllNews = ({ selectedTags, loadingFilter }) => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [hasMoreItems, setHasMoreItems] = useState(true);
  //=============get last News===========
  const [delete_news] = useMutation(DELETE_NEWS);
  const {
    loading,
    data: news,
    fetchMore,
    refetch,
  } = useQuery(GET_OWN_NEWS, {
    variables: { limit: 6, offset: 0 },
    pollInterval: 500,
  });
  // const { loading: userLoading, data: userData } = useQuery(GET_USER);
  const { data: vote_up_down, loading: vote_up_down_loading } =
    useQuery(GET_VOTE_UP_DOWN);
  const { data: get_all_vote, loading: loading_all_vote } = useQuery(
    GET_ALL_VOTE_UP_DOWN,
    {
      pollInterval: 500,
    }
  );
  if (loading || vote_up_down_loading || loading_all_vote) return <div className="container">login...</div>;
  return (
    <React.Fragment>
      <Profile />

      <div className="container">
        <Row style={{ display: "flex" }}>
          <Col span={16}>
            {news.get_own_news.length === 0 && (
              <center>
                <Empty />
                <br></br>
              </center>
            )}
            {news.get_own_news.map((res, index) => {
              return (
                <div>
                  <Card
                    // extra={
                    //   <a className="te" href="#">
                    //     More
                    //   </a>
                    // }
                    // style={{ padding: "-10px" }}
                    className="card-article"
                    key={index}
                  >
                    <Row gutter={[8, 8]}>
                      <Col xs={24} md={16} className="box-news">
                        <Link
                          href={`/profile_detial/${
                            res.user.accountId
                          }#${res.user.fullname
                            .replace(
                              /[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g,
                              "-"
                            )
                            .toLowerCase()}`}
                        >
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
                        </Link>
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
                                <CaretRightOutlined
                                  style={{ fontSize: "10px" }}
                                />
                              </span>{" "}
                              {res.categories.name}
                            </button>
                            <Link href={`/detail/${res.slug}`}>
                              <button className="readmore">
                                Read More <span>&rarr;</span>
                              </button>
                            </Link>

                            <Link href={`/dashboard/editstory/${res.id}`}>
                              <Tag className="edit-button">
                                <BsPencil
                                  color="rgb(32, 166, 147)"
                                  size="15px"
                                  style={{ marginTop: "6px" }}
                                />
                              </Tag>
                            </Link>
                            <Divider type="vertical" />
                            <Popconfirm
                              placement="topRight"
                              title="Are you sure to delete?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() => {
                                delete_news({ variables: { id: `${res.id}` } })
                                  .then(async (res) => {
                                    await message.success(
                                      res.data.delete_news.message
                                    );
                                    await refetch();
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                    return null;
                                  });
                              }}
                            >
                              <Tag className="delete-button">
                                <BsTrash
                                  color="#ff5858"
                                  size="15px"
                                  style={{ marginTop: "6px" }}
                                />
                              </Tag>
                            </Popconfirm>
                          </div>
                          <NewLike
                            postId={res.id}
                            ownerId={res.user.id}
                            voteCount={res.voteCount}
                            vote_up_down={vote_up_down}
                            get_all_vote={get_all_vote}
                            // refetch={refetch}
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
                </div>
              );
            })}
            <InfiniteScroll
              dataLength={news.get_own_news.length}
              next={async () => {
                await fetchMore({
                  variables: {
                    offset: news.get_own_news.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    if (fetchMoreResult.get_own_news.length < 6) {
                      setHasMoreItems(false);
                    }

                    return Object.assign({}, prev, {
                      get_own_news: [
                        ...prev.get_own_news,
                        ...fetchMoreResult.get_own_news,
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
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default AllNews;
