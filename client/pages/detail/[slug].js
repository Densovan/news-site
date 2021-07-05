import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_BY_SLUG, GET_USER } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import { Col, Row, Button, Divider } from "antd";
import Laoder from "../../components/loaders/detailLoader";
import Follower from "../../components/common/follower";
import Like from "../../components/common/like";
import AuthContext from "../../contexts/authContext";
import Link from "next/link";
import FormLike from "../../components/common/like";

import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";

import FormComment from "../../components/common/comment";
import CommentList from "../../components/commentList";

const SinglePage = () => {
  const { loggedIn } = useContext(AuthContext);
  const router = useRouter();
  const { slug } = router.query;
  // const [dataSlug, setDataSlug] = useState({
  //   id: "",
  //   title: "",
  //   thumnail: "",
  //   des: "",
  //   user: "",
  //   createdAt: "",
  //   comment: [],
  //   reply: []
  // })
  const { loading, data, refetch } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
    pollInterval: 500,
  });
  const { loading: userLoadin, data: myUser } = useQuery(GET_USER);

  if (loading || userLoadin)
    return (
      <div className="container">
        <center style={{ marginTop: "100px" }}>
          <Laoder />
        </center>
      </div>
    );
  const { id, title, thumnail, des, user, createdAt, comment, reply, like } =
    data.get_news_by_slug;

  const result = <Output data={JSON.parse(des)} />;
  return (
    <React.Fragment>
      <MainNavbar />
      <div className="container">
        <div style={{ marginTop: 16 }}>
          <Row gutter={[16, 16]}>
            <Col sm={24} md={2}>
              {loggedIn === true && (
                <div className="nav_left">
                  <FormLike articleId={id} dataLike={like} myUser={myUser} />
                  <div className="btn_box">
                    <Button
                      className="btn_share"
                      style={{ borderColor: "transparent", boxShadow: "none" }}
                      shape="circle"
                      icon={<ShareAltOutlined />}
                      size="large"
                    />
                    <div className="tt_share">21</div>
                  </div>
                </div>
              )}
            </Col>
            <Col sm={24} md={16}>
              <div>
                <div className="thumail">
                  <img
                    src={"http://localhost:3500/public/uploads/" + thumnail}
                  />
                </div>
                <div className="article_title">
                  <h1>{title}</h1>
                </div>
                <div>
                  <div className="pf_user">
                    <img src={user.image} />
                    <div className="name">
                      <label>{user.fullname}</label>
                      <div className="time">
                        <label>
                          {moment.unix(createdAt / 1000).format("DD-MM-YYYY")} ·
                          3 min read
                        </label>
                      </div>
                    </div>
                  </div>
                  <div style={{ color: "#262e3c", marginBottom: 20 }}>
                    <p className="describe-style" style={{ fontSize: "20px" }}>
                      {result}
                    </p>
                  </div>
                  <Divider />
                  {loggedIn === true ? (
                    <div style={{ marginTop: 20 }}>
                      <h3>Comment({reply.length + comment.length})</h3>
                      <div>
                        <FormComment user={user} articleId={id} />
                        <CommentList
                          articleId={id}
                          comments={comment}
                          reply={reply}
                          fullname={user.fullname}
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
                      {/* <FormComment user={user} articleId={id} myUser={myUser} />
                      <CommentList
                        articleId={id}
                        comments={comment}
                        reply={reply}
                        fullname={user.fullname}
                      /> */}
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col sm={24} md={6}>
              <div className="pf_pre">
                <div className="pf_user">
                  <img src={user.image} />
                  <div className="name">
                    <label>{user.fullname}</label>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="pf_desc">
                  <center>
                    <p>{user.bio}</p>
                  </center>
                </div>
                {loggedIn === true ? (
                  <center>
                    {user.id === myUser.get_user.id ? (
                      ""
                    ) : (
                      <Follower articleUser={user} />
                    )}
                  </center>
                ) : (
                  <center>
                    <Follower articleUser={user} />
                  </center>
                )}

                <div className="pf-work">
                  {/* ======work======= */}
                  <div>
                    <Divider
                      style={{ fontSize: "18", color: "gray" }}
                      orientation="left"
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
                    <h4>{moment.unix(user.createdAt / 1000).format("LL")}</h4>
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
