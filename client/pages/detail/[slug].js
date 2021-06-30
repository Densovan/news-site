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
  const [dataSlug, setDataSlug] = useState({
    id: "",
    title: "",
    thumnail: "",
    des: "",
    user: "",
    createdAt: "",
    comment: [],
    reply: [],
  });
  const { loading, data, refetch } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
    pollInterval: 500,
  });
  const { loading: laodingUser, data: dataUser } = useQuery(GET_USER);

  if (loading || laodingUser)
    return (
      <div className="container">
        <center style={{ marginTop: "100px" }}>
          <Laoder />
        </center>
      </div>
    );
  // const { id: contextId } = dataUser.get_user;
  const { id, title, thumnail, des, user, createdAt, comment, reply, like } =
    data.get_news_by_slug;

  const result = <Output data={JSON.parse(des)} />;
  return (
    <React.Fragment>
      <MainNavbar />
      <div className="container">
        <div style={{ marginTop: 16 }}>
          <Row gutter={[16, 16]}>
            <Col span={2}>
              <div className="nav_left">
                <div className="btn_box">
                  {/* <Like
                    postId={id}
                    userId={user.id}
                    likes={like}
                    contextId={dataUser.get_user.id}
                    refetch={refetch}
                  /> */}
                  <Button
                    className="btn_like"
                    style={{ borderColor: "transparent", boxShadow: "none" }}
                    shape="circle"
                    icon={<HeartOutlined />}
                    size="large"
                  />
                  <div className="tt_like">11</div>
                </div>
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
            </Col>
            <Col span={16}>
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
                    {result}
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
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="pf_pre">
                <div className="pf_user">
                  <img src={user.image} />
                  <div className="name">
                    <label>{user.fullname}</label>
                  </div>
                </div>
                <div className="pf_desc">
                  <p>{user.bio}</p>
                </div>
                <Follower articleUser={user} />
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
