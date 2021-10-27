import React, { useContext } from "react";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_BY_SLUG, GET_USER, GET_FOLLOWS } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { Col, Row, Divider } from "antd";
import Laoder from "../../components/loaders/detailLoader";
import Follow from "../../components/common/follow";
import { useAuth } from "../../layouts/layoutAuth";
import Link from "next/link";
import FormSave from "../../components/common/save";

import {
  HiOutlineShare,
  HiOutlineBookmark,
} from "react-icons/hi";

import FormComment from "../../components/common/comment";
import CommentList from "../../components/commentList";

const SinglePage = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const { loading, data } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
    // pollInterval: 1000,
  });
  const { data: follows, loading: follow_loading } = useQuery(GET_FOLLOWS);

  if (loading || follow_loading)
    return (
      <div className="container">
        <center style={{ marginTop: "100px" }}>
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
          <Row gutter={[16, 16]}>
            <Col xs={24} md={2}>
              {isAuthenticated && (
                <div className="nav_left">
                  <Row gutter={[32, 32]}>
                    <Col xs={8} md={24}>
                      <div className="btn_box">
                        <button
                          style={{ cursor: "pointer" }}
                          className="share-bg"
                        >
                          <HiOutlineShare className="share" size={23} />
                        </button>
                        <div className="tt_share">31</div>
                      </div>
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
                          createBy={data.get_news_by_slug.user.id}
                          thumnail={thumnail}
                          save={save}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
            <Col xs={24} md={16}>
              <div>
                <div className="arcticle-div">
                  <div
                    className="thumail-article"
                    style={{
                      backgroundImage: `url(${URL_ACCESS}/public/uploads//${thumnail})`,
                    }}
                  ></div>
                </div>
                <div className="article_title">
                  <h1>{title}</h1>
                </div>

                <div>
                  <Link href={`/profile_detial/${data.get_news_by_slug.user.id}`}>
                    <div style={{ cursor: "pointer" }} className="pf_user">
                      <img src={data.get_news_by_slug.user.image} />

                      <div className="name">
                        <label>{data.get_news_by_slug.user.fullname}</label>
                        <div className="time">
                          <label>
                            {moment.unix(createdAt / 1000).format("DD-MM-YYYY")}{" "}
                            · 3 min read
                          </label>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div style={{ color: "#262e3c", marginBottom: 20 }}>
                    {/* <p className="describe-style-article">{result}</p> */}
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
                        <CommentList
                          articleId={id}
                          comments={comment}
                          reply={reply}
                          fullname={data.get_news_by_slug.user.fullname}
                          ownerId={data.get_news_by_slug.user.accountId}
                          // ownerId={user.id}
                        />
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
                          style={{ maxWidth: "50%" }}
                          src="/assets/images/Login-rafiki.png"
                        />
                      </center>
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="pf_pre">
                <Link href={`/profile_detial/${data.get_news_by_slug.user.id}`}>
                  <div style={{ cursor: "pointer" }} className="pf_user">
                    <img src={data.get_news_by_slug.user.image} />
                    <div className="name">
                      <label>{data.get_news_by_slug.user.fullname}</label>
                      <p>{data.get_news_by_slug.user.email}</p>
                    </div>
                  </div>
                </Link>
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
                  ""
                )}

                <div className="pf-work">
                  {/* ======work======= */}
                  <div>
                    <Divider
                      orientation="left"
                      style={{ fontSize: "18", color: "gray" }}
                    >
                      Work
                    </Divider>
                    <h4>Community Lead at DSC JSS </h4>
                  </div>
                  {/* ===========Location============ */}
                  <div>
                    <Divider
                      style={{ fontSize: "18", color: "gray" }}
                      orientation="left"
                    >
                      Location
                    </Divider>
                    <h4>Noida, Uttar Pradesh, India </h4>
                  </div>
                  {/*========= Education=========== */}
                  <div>
                    <Divider
                      style={{ fontSize: "18", color: "gray" }}
                      orientation="left"
                    >
                      Education
                    </Divider>
                    <h4>JSS Academy Of Technical Education Noida </h4>
                  </div>
                  {/* //===========join============== */}
                  <div>
                    <Divider
                      style={{ fontSize: "18", color: "gray" }}
                      orientation="left"
                    >
                      Join
                    </Divider>
                    <h4>{moment.unix(data.get_news_by_slug.user.createdAt / 1000).format("LL")}</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SinglePage;
