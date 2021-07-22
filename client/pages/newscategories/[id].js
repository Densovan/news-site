import React, { useState } from "react";
import { useRouter } from "next/router";
import { Row, Col, Divider, Breadcrumb, Spin } from "antd";
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
import InfiniteScroll from "react-infinite-scroll-component";
import Laoder from "../../components/loaders/laoder";
import GlobalHeader from "../../components/Layouts/globalHeader";

const AllNews = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  //=============get last News===========
  const { loading, data, fetchMore } = useQuery(GET_NEWS_NEWS_BY_CAT, {
    variables: { id, limit: 6, offset: 0 },
  });
  if (loading) return <div>{/* <Laoder /> */}</div>;

  return (
    <React.Fragment>
      {/* <TopNavbar /> */}
      {/* <MainNavbar /> */}
      <GlobalHeader />
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
        {/* <Divider></Divider> */}
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6}>
            {/* <div className="news-cat"> */}
            <Categories />
            {/* </div> */}
          </Col>
          <Col xs={24} md={18}>
            {data.get_allnews_type_by_cat_news.map((res) => {
              const result = <Output data={JSON.parse(res.des)} />;
              return (
                <div className="content-top-stories">
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
                        <Col xs={24} md={18}>
                          <div className="date-avatar">
                            <div className="sub-date-avatar">
                              <img
                                className="avatar-mobile"
                                src={res.user.image}
                              />
                            </div>
                            <div>
                              <h1 className="status-news-topstory">
                                {res.types.name}
                                <span>
                                  <CaretRightOutlined
                                    style={{ fontSize: "10px" }}
                                  />
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
                        <Col xs={24} md={6}>
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
                </div>
              );
            })}
            <InfiniteScroll
              dataLength={data.get_allnews_type_by_cat_news.length}
              next={async () => {
                fetchMore({
                  variables: {
                    offset: data.get_allnews_type_by_cat_news.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    if (
                      fetchMoreResult.get_allnews_type_by_cat_news.length < 6
                    ) {
                      setHasMoreItems(false);
                    }
                    return Object.assign({}, prev, {
                      get_allnews_type_by_cat_news: [
                        ...prev.get_allnews_type_by_cat_news,
                        ...fetchMoreResult.get_allnews_type_by_cat_news,
                      ],
                    });
                  },
                });
              }}
              hasMore={hasMoreItems}
              loader={
                // <Content style={{ marginTop: "50px" }}>
                <center style={{ marginTop: "50px" }}>
                  <Spin></Spin>
                </center>
                // </Content>
              }
              endMessage={null}
            ></InfiniteScroll>
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
