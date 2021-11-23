import { Fragment, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Tooltip,
  Result,
  Layout,
  Avatar,
  Spin,
  center,
} from 'antd';
import NewsVote from '../common/news.vote';
import { useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import pretty from 'pretty-date';
import { CaretRightOutlined } from '@ant-design/icons';
import {
  GET_ALL_NEWS,
  GET_VOTE_UP_DOWN,
  GET_ALL_VOTE_UP_DOWN,
} from '../../graphql/query';
import Link from 'next/dist/client/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import Medium from '../loaders/newsLoader';

const Content = ({
  selectedTags,
  loadingFilter,
  news,
  loadingNews,
  refetch
}) => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === 'development' ? server_local : server;

  const { data: vote_up_down, loading: vote_up_down_loading } =
    useQuery(GET_VOTE_UP_DOWN);
  const { data: get_all_vote, loading: loading_all_vote } =
    useQuery(GET_ALL_VOTE_UP_DOWN);
  if (loadingNews || vote_up_down_loading || loading_all_vote || loadingFilter)
    return (
      <div>
        <Medium />
      </div>
    );
  const result = [];
  if (!loadingFilter) {
    if (selectedTags.length === 0) {
      news.map((news) => {
        result.push(news);
      });
    } else {
      let selectedTag = [];
      selectedTags.forEach((element) => {
        if (element === 'All') {
          selectedTag.push(element);
        }
      });
      if (selectedTag[0] == 'All') {
        news.map((news) => {
          result.push(news);
        });
      } else {
        news.filter((news) => {
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
    // <Fragment>
    //   {loadingFilter ? (
    //     <div>
    //       {' '}
    //       <Medium />{' '}
    //     </div>
    //   ) : (
        
    //   )}
    // </Fragment>
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
                <Row gutter={[8, 8]}>
                  <Col xs={24} md={7}>
                    <div
                      className="image-news-style"
                      style={{
                        backgroundImage: `url(${URL_ACCESS}/public/uploads//${res.thumnail})`,
                      }}
                    ></div>
                  </Col>
                  <Col xs={24} md={16} className="box-news">
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
                      title={res.title.substring(0, 80) + ' ...'}
                      refetch={refetch}
                    />
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Fragment>
  );
};

export default Content;
