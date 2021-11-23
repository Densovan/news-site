import React, { useState } from "react";
import { Row, Col, Avatar, Input, Layout, Spin } from "antd";
import FilterNews from "../news/filterNews";
import Main from "./main";
import Footer from "../../components/Layouts/footer";
import { useAuth } from "../../layouts/layoutAuth";
import Link from "next/link";
import FilterNavbar from "../../components/Layouts/filterNavbar";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_TOP } from "../../graphql/query";
import Content from '../../components/globals/Content';
import InfiniteScroll from 'react-infinite-scroll-component';
import Filter from "../../components/globals/Filter";
import Suggestion from "../../components/globals/Suggestion";

const index = () => {
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [state, setState] = useState({
    selectedTags: ["All"],
    loading: false,
  });

  const { isAuthenticated, user } = useAuth();
  const { data: news, loading:loadingNews, refetch, fetchMore } = useQuery(GET_ALL_NEWS_TOP);

  const handleChange = (tag, checked) => {
    const { selectedTags } = state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setState({ selectedTags: nextSelectedTags, loading: true });
    setTimeout(() => {
      setState({ selectedTags: nextSelectedTags, loading: false });
    }, 1000);
  };

  return (
    <React.Fragment>
      <Content
        selectedTags={state.selectedTags}
        loadingFilter={state.loading}
        news={news!=null && news.get_all_news_top}
        loadingNews={loadingNews}
        refetch={refetch}
        fetchMore={fetchMore}
      />
      {/* <div className="container">
        <br></br>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Filter
              handleChange={handleChange}
              selectedTags={state.selectedTags}
            />
            <Suggestion user={user} isAuthenticated={isAuthenticated} />
          </Col>
          <Col xs={24} md={16}>
            {isAuthenticated === true && (
              <Row className="status-style">
                <Col span={2}>
                  <center>
                    <Avatar
                      style={{
                        height: 35,
                        width: 35,
                        cursor: "pointer",
                        border: "solid 2px #ffffff9d",
                      }}
                      src={user && user.user.get_user.image}
                      shape="circle"
                    />
                  </center>
                </Col>
                <Col span={22}>
                  <Link href="/dashboard/addstory">
                    <Input size="middle" placeholder="Write your story" />
                  </Link>
                </Col>
              </Row>
            )}
            <FilterNavbar />
            <Content
              selectedTags={state.selectedTags}
              loadingFilter={state.loading}
              news={news!=null && news.get_all_news_top}
              loadingNews={loadingNews}
              refetch={refetch}
            />
            {news != null && (
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
                  <Layout.Content style={{ marginTop: '15px' }}>
                    <center>
                      <Spin></Spin>
                    </center>
                  </Layout.Content>
                }
                endMessage={null}
              ></InfiniteScroll>
            )}
          </Col>
        </Row>
      </div>
      <Footer /> */}
    </React.Fragment>
  );
};

export default index;
