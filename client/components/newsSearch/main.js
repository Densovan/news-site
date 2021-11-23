import React, { useState, Fragment, useContext } from "react";
import pretty from "pretty-date";
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
import Link from "next/link";
import { useQuery } from "@apollo/client";
import moment from "moment";
import Medium from "../../components/loaders/newsLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../../layouts/layoutAuth";
import NewsVote from '../common/news.vote';

const { Content } = Layout;

const AllNews = ({
  selectedTags,
  loadingFilter,
  data,
  fetchMore,
  refetch,
  userData,
  vote_up_down,
  get_all_vote,
}) => {
  const { isAuthenticated } = useAuth();
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [hasMoreItems, setHasMoreItems] = useState(true);

  const result = [];
  if (!loadingFilter) {
    // console.log(data);
    if (selectedTags.length === 0) {
      data.search_news_title.map((news) => {
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
        data.search_news_title.map((news) => {
          result.push(news);
        });
      } else {
        data.search_news_title.filter((news) => {
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
  const timeAgo = (time) => {
    var created_date = new Date(time * 1000).getTime() / 1000;
    return <>{pretty.format(new Date(created_date))}</>;
  };
  return (
    <React.Fragment>
      {loadingFilter ? (
        <div>
          {' '}
          <Medium />{' '}
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
            // console.log(res.user.accountId, "accountId");
            return (
              <Card
                // style={{ padding: "-10px" }}
                className="card-article"
                key={index}
              >
                <Row gutter={[8, 8]}>
                  <Col xs={24} md={7}>
                    <div
                      className="image-news-style"
                      style={{
                        backgroundImage: `url(${URL_ACCESS}/public/uploads//${res.thumnail})`,
                      }}
                    ></div>
                  </Col>
                  <Col
                    xs={24}
                    md={16}
                    className="box-news"
                  >
                    <Link
                      href={`/profile_detial/${
                        res.user.accountId
                      }#${res.user.fullname
                        .replace(
                          /[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g,
                          '-',
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
                            <li style={{ cursor: 'pointer' }}>
                              {res.user.fullname}
                            </li>
                          </Tooltip>
                          <li className="news-name">
                            {timeAgo(res.createdAt)}
                            {/* {moment
                              .unix(res.createdAt / 1000)
                              .format('DD-MM-YYYY')} */}
                          </li>
                        </div>
                      </div>
                    </Link>
                    <div className="news-content">
                      <div className="title-text-card">
                        {res.title.length <= 48
                          ? res.title
                          : res.title.substring(0, 48) + ' ...'}
                      </div>
                      <div className="text-content-card">
                        {parse(
                          res.des.length <= 120
                            ? res.des
                            : res.des.substring(0, 120) + '...',
                        )}
                      </div>
                    </div>
                    <div className="news-footer">
                      <div>
                        <button className="type-category">
                          {res.types.name}
                          <span>
                            <CaretRightOutlined style={{ fontSize: '10px' }} />
                          </span>{' '}
                          {res.categories.name}
                        </button>
                        <Link href={`/detail/${res.slug}`}>
                          <button className="readmore">
                            Read More <span>&rarr;</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} md={1} style={{ position: 'relative' }}>
                    <NewsVote
                      postId={res.id}
                      ownerId={res.user.accountId}
                      voteCount={res.voteCount}
                      vote_up_down={vote_up_down}
                      get_all_vote={get_all_vote}
                      title={res.title.substring(0, 80) + " ..."}
                      refetch={refetch}
                    />
                  </Col>
                </Row>
              </Card>
            );
          })}
          <InfiniteScroll
            dataLength={data.search_news_title.length}
            next={async () => {
              await fetchMore({
                variables: {
                  offset: data.search_news_title.get_all_news.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;

                  if (fetchMoreResult.search_news_title.length < 6) {
                    setHasMoreItems(false);
                  }

                  return Object.assign({}, prev, {
                    get_all_news: [
                      ...prev.search_news_title,
                      ...fetchMoreResult.search_news_title,
                    ],
                  });
                },
              });
            }}
            hasMore={hasMoreItems}
            loader={
              <Content style={{ marginTop: '15px' }}>
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
