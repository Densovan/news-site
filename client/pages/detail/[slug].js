import React, { useContext } from 'react';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import Footer from '../../components/Layouts/footer';
import { GET_NEWS_BY_SLUG, GET_USER, GET_FOLLOWS } from '../../graphql/query';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { Col, Row, Divider } from 'antd';
import Laoder from '../../components/loaders/detailLoader';
import Follow from '../../components/common/follow';
import { useAuth } from '../../layouts/layoutAuth';
import Link from 'next/link';
import FormSave from '../../components/common/save';
import FormShare from '../../components/common/share';
import pretty from 'pretty-date';

import FormComment from '../../components/common/comment';
import CommentList from '../../components/commentList';
import { FaGraduationCap, FaMapMarkerAlt, FaShoppingBag, FaCalendarAlt } from 'react-icons/fa';

const SinglePage = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === 'development' ? server_local : server;

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const { loading, data, refetch } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
    // pollInterval: 1000,
  });
  const { data: follows, loading: follow_loading } = useQuery(GET_FOLLOWS);
  const timeAgo = (time) => {
    var created_date = new Date(time * 1000).getTime() / 1000;
    return <>{pretty.format(new Date(created_date))}</>;
  };

  if (loading || follow_loading)
    return (
      <div className="container">
        <center style={{ marginTop: '100px' }}>
          <Laoder />
        </center>
      </div>
    );
  const {
    id,
    title,
    thumnail,
    des,
    createdAt,
    comment,
    reply,
    like,
    category,
    type,
    save,
  } = data.get_news_by_slug;
  return (
    <React.Fragment>
      <div className="container">
        <div style={{ marginTop: 40 }}>
          <Row gutter={[16, 16]} style={{overflow: 'hidden', height: '88vh'}}>
            <Col xs={24} md={2}>
              {isAuthenticated && (
                <div className="nav_left">
                  <Row gutter={[16, 16]}>
                    <Col xs={8} md={24}>
                      <FormShare />
                    </Col>
                    <Col xs={8} md={24}>
                      <div className="btn_box">
                        <FormSave
                          news_id={id}
                          title={title}
                          des={des}
                          category={category}
                          type={type}
                          slug={slug}
                          myUser={user.user}
                          createBy={data.get_news_by_slug.user.accountId}
                          thumnail={thumnail}
                          save={save}
                          refetch={refetch}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
            <Col xs={24} md={16} style={{ overflow: 'auto', height: '100%' }}>
              <div
                className="contain-article"
                style={{ backgroundColor: '#fff' }}
              >
                <div className="article-div">
                  <div
                    className="thumail-article"
                    style={{
                      backgroundImage: `url(${URL_ACCESS}/public/uploads//${thumnail})`,
                    }}
                  ></div>
                </div>
                <div className="contain-blog">
                  <div className="article_title">
                    <h1>{title}</h1>
                  </div>

                  <div>
                    <Link
                      href={`/profile_detial/${
                        data.get_news_by_slug.user.accountId
                      }#${data.get_news_by_slug.user.fullname
                        .replace(
                          /[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g,
                          '-',
                        )
                        .toLowerCase()}`}
                    >
                      <div style={{ cursor: 'pointer' }} className="pf_user">
                        <img src={data.get_news_by_slug.user.image} />

                        <div className="name">
                          <label>{data.get_news_by_slug.user.fullname}</label>
                          <div className="time">
                            <label>
                              {timeAgo(createdAt)}{" "}
                              {/* {moment
                                .unix(createdAt / 1000)
                                .format('DD-MM-YYYY')}{' '} */}
                              · 3 min read
                            </label>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div style={{ color: '#262e3c', marginBottom: 20 }}>
                      <div className="describe-style-article">{parse(des)}</div>
                    </div>
                    <Divider />
                    {isAuthenticated ? (
                      <div style={{ marginTop: 20 }}>
                        <h3>Comment({reply.length + comment.length})</h3>
                        <div>
                          <FormComment
                            user={data.get_news_by_slug.user}
                            articleId={id}
                            // ownerId={user.id}
                            ownerId={data.get_news_by_slug.user.accountId}
                          />
                          {
                            comment.length > 0 ? 
                            <CommentList
                              articleId={id}
                              comments={comment}
                              reply={reply}
                              fullname={data.get_news_by_slug.user.fullname}
                              ownerId={data.get_news_by_slug.user.accountId}
                            /> :
                            ""
                          }
                        </div>
                      </div>
                    ) : (
                      <div>
                        <center>
                          <br></br>
                          <h3>
                            Please <Link href="/signin">Login</Link> to Make
                            Discussion
                          </h3>
                          <img
                            style={{ maxWidth: '50%' }}
                            src="/assets/images/Login-rafiki.png"
                          />
                        </center>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={7}>
              <div className="pf_pre">
                <center>
                  <div style={{ cursor: 'pointer' }} className="pr_user">
                    <img
                      src={data.get_news_by_slug.user.image}
                      height="48"
                      width="48"
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                </center>
                <div className="pf_desc">
                  <center>
                    <p>{data.get_news_by_slug.user.bio}</p>
                  </center>
                </div>
                {isAuthenticated ? (
                  <center>
                    {data.get_news_by_slug.user.id === user.user.get_user.id ? (
                      <center>
                        <Link href="/dashboard/profile">
                          <button className="btn-follow">My Account</button>
                        </Link>
                      </center>
                    ) : (
                      <Follow
                        articleUser={data.get_news_by_slug.user}
                        follows={follows}
                        user={user.user}
                      />
                    )}
                  </center>
                ) : (
                  ''
                )}

                <div className="inform-user">
                  <Row style={{ textAlign: 'center' }}>
                    <Col md={8}>
                      <div>
                        <strong>18</strong>
                      </div>
                      <div>Follower</div>
                    </Col>
                    <Col md={8}>
                      <div>
                        <strong>18</strong>
                      </div>
                      <div>Following</div>
                    </Col>
                    <Col md={8}>
                      <div>
                        <strong>18</strong>
                      </div>
                      <div>Stories</div>
                    </Col>
                  </Row>
                </div>
                <Divider/>
                <div className="preview-profile">
                  <div style={{ display: 'flex'}}>
                    <div style={{ display: 'flex'}}>
                      <div className="icons" style={{position: 'relative', height:'100%'}}>
                        <FaGraduationCap style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(0%,-50%)', fontSize:"20px", color:"#8D949E"}}/>
                      </div>
                      <span style={{ paddingLeft: '32px', fontSize: '14px', paddingTop:'2px', color:"#8D949E"}}>Education</span>
                    </div>
                  </div>
                  <div>
                    Cambodia Academy of Digital Technology
                  </div>
                </div>

                <div className="preview-profile">
                  <div style={{ display: 'flex'}}>
                    <div style={{ display: 'flex'}}>
                      <div className="icons" style={{position: 'relative', height:'100%'}}>
                        <FaMapMarkerAlt style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(0%,-50%)', fontSize:"18px", color:"#8D949E"}}/>
                      </div>
                      <span style={{ paddingLeft: '32px', fontSize: '14px', paddingTop:'2px', color:"#8D949E"}}>Location</span>
                    </div>
                  </div>
                  <div>
                   Kandal, Cambodia
                  </div>
                </div>

                <div className="preview-profile">
                  <div style={{ display: 'flex'}}>
                    <div style={{ display: 'flex'}}>
                      <div className="icons" style={{position: 'relative', height:'100%'}}>
                        <FaShoppingBag style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(0%,-50%)', fontSize:"18px", color:"#8D949E"}}/>
                      </div>
                      <span style={{ paddingLeft: '32px', fontSize: '14px', paddingTop:'2px', color:"#8D949E"}}>Work</span>
                    </div>
                  </div>
                  <div>
                    KOOMPI CO,LTD
                  </div>
                </div>

                <div className="preview-profile">
                  <div style={{ display: 'flex'}}>
                    <div style={{ display: 'flex'}}>
                      <div className="icons" style={{position: 'relative', height:'100%'}}>
                        <FaCalendarAlt style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(0%,-50%)', fontSize:"18px", color:"#8D949E"}}/>
                      </div>
                      <span style={{ paddingLeft: '32px', fontSize: '14px', paddingTop:'2px', color:"#8D949E"}}>Join</span>
                    </div>
                  </div>
                  <div>
                    {moment
                    .unix(data.get_news_by_slug.user.createdAt / 1000)
                    .format('LL')}
                  </div>
                </div>
              </div>
              <div className="pf_pre">
                <div>
                  Hello
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default SinglePage;
