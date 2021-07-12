import React, { useState } from "react";
import { Col, Row, Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_FEATURE } from "../../graphql/query";
import Link from "next/link";
import moment from "moment";
import Output from "editorjs-react-renderer";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/loaders/laoder";

const main = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [hasMoreItems, setHasMoreItems] = useState(true);

  const { loading, data, fetchMore } = useQuery(GET_ALL_NEWS_BY_TYPE_FEATURE, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading)
    return (
      <center>
        <Loader />
      </center>
    );
  return (
    <div>
      <Row gutter={[12, 12]}>
        {data.get_all_news_by_type_feature.map((res, index) => {
          const result = <Output data={JSON.parse(res.des)} />;
          return (
            <Col
              key={index}
              className="content-top-stories"
              sm={24}
              md={12}
              lg={8}
            >
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
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
      <InfiniteScroll
        dataLength={data.get_all_news_by_type_feature.length}
        next={async () => {
          fetchMore({
            variables: {
              offset: data.get_all_news_by_type_feature.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;

              if (fetchMoreResult.get_all_news_by_type_feature.length < 6) {
                setHasMoreItems(false);
              }
              return Object.assign({}, prev, {
                get_all_news_by_type_feature: [
                  ...prev.get_all_news_by_type_feature,
                  ...fetchMoreResult.get_all_news_by_type_feature,
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
    </div>
  );
};

export default main;
