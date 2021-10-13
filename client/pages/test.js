import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_TOP } from "../graphql/query";
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
const { Content } = Layout;
const Test = () => {
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const {
    loading,
    data: news,
    fetchMore,
    refetch,
  } = useQuery(GET_ALL_NEWS_TOP, {
    // variables: { limit: 6, offset: 0 },
    pollInterval: 1000,
  });
  if (loading) return "loading...";
  console.log(news);
  return (
    <div>
      {news.get_all_news_top.map((res) => (
        <div>
          <h1>{res.title}</h1>
        </div>
      ))}
      {/* <InfiniteScroll
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
                get_all_news_top: [
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
      ></InfiniteScroll> */}
    </div>
  );
};

export default Test;
