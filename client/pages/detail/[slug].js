import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_BY_SLUG } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import { Col, Row, Button, Divider } from "antd";
import Laoder from "../../components/loaders/detailLoader";
import Follower from "../../components/common/follower";

import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";

import FormComment from "../../components/common/comment";
import CommentList from "../../components/commentList";

const SinglePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, data } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
    pollInterval: 500,
    fetchPolicy: "network-only",
  });

  if (loading)
    return (
      <div className="container">
        <center style={{ marginTop: "100px" }}>
          <Laoder />
        </center>
      </div>
    );
  const { id, title, thumnail, des, user, createdAt, comment, reply } =
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
                  <div style={{ marginTop: 20 }}>
                    <h3>Comment({reply.length})</h3>

                    <div>
                      <FormComment user={user} articleId={id} />
                      <CommentList
                        articleId={id}
                        comments={comment}
                        reply={reply}
                      />
                    </div>
                  </div>
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
                  <p>
                    Love to build Web Apps A journey of Full Stack Developer!
                  </p>
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
