import React, { useState } from "react";
import { Col, Row, Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Loader from "../../components/loaders/laoder";
import { GET_ALL_NEWS_BY_TYPE_LEARN } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

const main = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [hasMoreItems, setHasMoreItems] = useState(true);

  const { loading, error, data, fetchMore } = useQuery(
    GET_ALL_NEWS_BY_TYPE_LEARN,
    {
      variables: { limit: 6, offset: 0 },
    }
  );
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <center>
        <Loader />
      </center>
    );
  return (
    <React.Fragment>
      <Row gutter={[12, 12]}>
        {data.get_all_news_by_type_learn.map((res, index) => {
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
        dataLength={data.get_all_news_by_type_learn.length}
        next={async () => {
          fetchMore({
            variables: {
              offset: data.get_all_news_by_type_learn.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;

              if (fetchMoreResult.get_all_news_by_type_learn.length < 6) {
                setHasMoreItems(false);
              }
              return Object.assign({}, prev, {
                get_all_news_by_type_learn: [
                  ...prev.get_all_news_by_type_learn,
                  ...fetchMoreResult.get_all_news_by_type_learn,
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
    </React.Fragment>
  );
};

export default main;
