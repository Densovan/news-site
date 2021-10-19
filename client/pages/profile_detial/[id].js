import React, { useState, useContext } from "react";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import {
  GET_USER_BY_ID,
  GET_USER,
  GET_VOTE_UP_DOWN,
  GET_ALL_VOTE_UP_DOWN,
  GET_OWN_NEWS_BY_ID,
} from "../../graphql/query";
import { useQuery, useMutation } from "@apollo/client";
import { useAuth } from "../../layouts/layoutAuth";
import Footer from "../../components/Layouts/footer";
import moment from "moment";
import ContentLoader from "react-content-loader";
import { Row, Col, Card, Avatar, Tooltip, Layout, Spin } from "antd";
import NewLike from "../../components/common/news.like";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { CaretRightOutlined } from "@ant-design/icons";
import Output from "editorjs-react-renderer";
import GlobalHeader from "../../components/Layouts/globalHeader";

const { Content } = Layout;
const Profile_detail = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const { isAuthenticated } = useAuth();
  const [show, setShow] = useState("all");
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  const {
    loading: currentLaoding,
    data: currentData,
    refetch: currentRefetch,
  } = useQuery(GET_USER);
  const { data: vote_up_down, loading: vote_up_down_loading } =
    useQuery(GET_VOTE_UP_DOWN);
  const { data: get_all_vote, loading: loading_all_vote } = useQuery(
    GET_ALL_VOTE_UP_DOWN,
    {
      pollInterval: 500,
    }
  );
  const {
    loading: own_newsLoading,
    data: own_newsData,
    fetchMore,
  } = useQuery(GET_OWN_NEWS_BY_ID, {
    variables: { id, limit: 6, offset: 0 },
    pollInterval: 500,
  });
  if (
    loading ||
    currentLaoding ||
    vote_up_down_loading ||
    loading_all_vote ||
    own_newsLoading
  )
    return (
      <center style={{ marginTop: "100px" }}>
        <ContentLoader
          width={900}
          height={560}
          viewBox="0 0 400 160"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="80" y="73" rx="3" ry="3" width="254" height="6" />
          <rect x="78" y="88" rx="3" ry="3" width="254" height="6" />
          <rect x="150" y="103" rx="3" ry="3" width="118" height="6" />
          <circle cx="210" cy="27" r="22" />
          <circle cx="181" cy="151" r="6" />
          <circle cx="211" cy="151" r="6" />
          <circle cx="241" cy="151" r="6" />
          <rect x="37" y="54" rx="32" ry="32" width="15" height="15" />
          <rect x="37" y="46" rx="0" ry="0" width="4" height="18" />
          <rect x="54" y="54" rx="32" ry="32" width="15" height="15" />
          <rect x="54" y="46" rx="0" ry="0" width="4" height="19" />
          <rect x="336" y="118" rx="32" ry="32" width="15" height="15" />
          <rect x="357" y="118" rx="32" ry="32" width="15" height="15" />
          <rect x="347" y="123" rx="0" ry="0" width="4" height="18" />
          <rect x="368" y="123" rx="0" ry="0" width="4" height="18" />
        </ContentLoader>
      </center>
    );
  return (
    <React.Fragment>
      {isAuthenticated === true && (
        <div>
          {data.get_user_by_id.id === currentData.get_user.id &&
            window.location.replace("/dashboard/profile")}
        </div>
      )}
      <div className="brand-bg"></div>
      <div className="container">
        <div className="container-layout-profile">
          <div className="layout-profile">
            <div className="place-follow-btn">
              {" "}
              {/* <Follower articleUser={data.get_user_by_id} /> */}
            </div>
            <center>
              <img className="profile-img1" src={data.get_user_by_id.image} />
              <h2>{data.get_user_by_id.fullname}</h2>
              <h3 className="date-news">
                Joined On :{" "}
                {moment.unix(data.get_user_by_id.createdAt / 1000).format("LL")}
              </h3>
              <h4 style={{ marginTop: "12px" }}>{data.get_user_by_id.bio}</h4>
            </center>
            <br></br>
          </div>
          <br></br>
          <div>
            <Row>
              <Col span={16}>
                {own_newsData.get_own_news_by_id.map((res) => {
                  return (
                    <div>
                      <Card
                        className="card-article"
                        // key={index}
                      >
                        {/* <h1 className="te">hello</h1> */}
                        <Row gutter={[8, 8]}>
                          <Col xs={24} md={16} className="box-news">
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
                              </div>
                              <NewLike
                                postId={res.id}
                                ownerId={res.user.id}
                                voteCount={res.voteCount}
                                vote_up_down={vote_up_down}
                                get_all_vote={get_all_vote}
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
                  dataLength={own_newsData.get_own_news_by_id.length}
                  next={async () => {
                    await fetchMore({
                      variables: {
                        offset: own_newsData.get_own_news_by_id.length,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        if (fetchMoreResult.get_own_news_by_id.length < 6) {
                          setHasMoreItems(false);
                        }
                        return Object.assign({}, prev, {
                          get_own_news_by_id: [
                            ...prev.get_own_news_by_id,
                            ...fetchMoreResult.get_own_news_by_id,
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
        </div>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Profile_detail;
