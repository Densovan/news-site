import React, { useState } from "react";
import { Breadcrumb, Spin } from "antd";
import { useRouter } from "next/router";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_FEATURE_BY_CAT } from "../../graphql/query";
import { Col, Row } from "antd";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import Categories from "../categories/feature";
import Link from "next/link";
import { CaretRightOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

const Index = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, fetchMore } = useQuery(GET_NEWS_FEATURE_BY_CAT, {
    variables: { id, limit: 6, offset: 0 },
  });
  if (loading)
    return (
      // <center style={{ marginTop: "100px" }}>
      //   <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
      // </center>
      ""
    );
  // console.log(data);
  return (
    <React.Fragment>
      {/* <TopNavbar /> */}
      <MainNavbar />
      <div className="container top-learns">
        {/* <center>
          <h1 className="about-main-title">Feature</h1>
        </center> */}
        <center>
          <h1 className="top-title-allNews">Features</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Features</Breadcrumb.Item>
          </Breadcrumb>
        </center>
        <br></br>
        <br></br>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6}>
            <Categories />
          </Col>
          <Col xs={24} md={18}>
            <Row gutter={[32, 32]}>
              {data.get_allnews_type_by_cat_feature.map((res) => {
                const result = <Output data={JSON.parse(res.des)} />;
                return (
                  <Col className="content-top-stories" sm={24} md={12} lg={8}>
                    <Link href={`/detail/${res.slug}`}>
                      <div className="learn-card">
                        <div
                          className="learn-style"
                          style={{
                            backgroundImage: `url(${URL_ACCESS}/public/uploads//${res.thumnail})`,
                          }}
                        ></div>
                        <div className="content-learn">
                          <h3 className="describe-style">
                            {res.title.length <= 20
                              ? res.title
                              : res.title.substring(0, 20) + " ..."}
                          </h3>
                          <p className="describe-style">
                            {`${result.props.data.blocks[0].data.text.substring(
                              0,
                              50
                            )}...`}
                          </p>
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
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
            <InfiniteScroll
              dataLength={data.get_allnews_type_by_cat_feature.length}
              next={async () => {
                fetchMore({
                  variables: {
                    offset: data.get_allnews_type_by_cat_feature.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    if (
                      fetchMoreResult.get_allnews_type_by_cat_feature.length < 6
                    ) {
                      setHasMoreItems(false);
                    }
                    return Object.assign({}, prev, {
                      get_allnews_type_by_cat_feature: [
                        ...prev.get_allnews_type_by_cat_feature,
                        ...fetchMoreResult.get_allnews_type_by_cat_feature,
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
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Index;
