import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_BY_SLUG } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import { Col, Row, Button, Tooltip, Avatar, Divider } from 'antd';
import { CubeSpinner } from "react-spinners-kit";
import ContentLoader from "react-content-loader";
import Follower from '../../components/common/follower';

import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from '@ant-design/icons';
import styles from '../../styles/article-story.module.css';

import FormComment from '../../components/common/comment';
import CommentList from '../../components/commentList';

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
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
      </center>
    );
  const { id,  title, thumnail, des, user, createdAt, comment, reply } = data.get_news_by_slug;
  const result = <Output data={JSON.parse(des)} />;
  return (
    <React.Fragment>
      {/* <TopNavbar /> */}
      {/* <MainNavbar />
      <div className="container">
        <br></br>
        <Row gutter={[32, 32]}>
          <Col sm={24} md={24} lg={17}>
            <div className="detail">
              <div className="detail-main-des">
                <h1>{title}</h1>
                <Row gutter={[12, 12]}>
                  <Col xs={24} md={20}>
                    <div>
                      <span>By : </span>
                      <span>
                        <b>{user.fullname}</b>
                      </span>
                    </div>
                  </Col>
                  <Col xs={24} md={4}>
                    <div className="badge-date">
                      {moment.unix(createdAt / 1000).format("DD-MM-YYYY")}
                    </div>
                  </Col>
                </Row>
              </div>
              <img
                style={{ maxWidth: "100%", marginTop: "12px" }}
                src={"http://localhost:3500/public/uploads/" + thumnail}
              />
              <div className="detail-des">
                <p>{result}</p>
              </div>
            </div>
          </Col>
          <Col sm={24} md={24} lg={7}></Col>
        </Row>
      </div> */}
      <MainNavbar />
      <div className="container">
        <div style={{ marginTop: 16 }}>
          <Row gutter={[16, 16]}>
            <Col span={2}>
              <div className={styles.nav_left}>
                <div className={styles.btn_box}>
                  <Button
                    className={styles.btn_like}
                    style={{ borderColor: 'transparent', boxShadow: 'none' }}
                    shape="circle"
                    icon={<HeartOutlined />}
                    size="large"
                  />
                  <div className={styles.tt_like}>11</div>
                </div>
                <div className={styles.btn_box}>
                  <Button
                    className={styles.btn_share}
                    style={{ borderColor: 'transparent', boxShadow: 'none' }}
                    shape="circle"
                    icon={<ShareAltOutlined />}
                    size="large"
                  />
                  <div className={styles.tt_share}>21</div>
                </div>
              </div>
            </Col>
            <Col span={16}>
              <div>
                <div className={styles.thumail}>
                  <img src={"http://localhost:3500/public/uploads/" + thumnail} />
                </div>
                <div className={styles.article_title}>
                  <h1>{title}</h1>
                </div>
                <div>
                  <div className={styles.pf_user}>
                    <img src={user.image} />
                    <div className={styles.name}>
                      <label>{user.fullname}</label>
                      <div className={styles.time}>
                        <label>{moment.unix(createdAt / 1000).format("DD-MM-YYYY")} · 3 min read</label>
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#262e3c', marginBottom: 20 }}>
                    {result}
                  </div>
                  <Divider />
                  <div style={{ marginTop: 20 }}>
                    <h3>Comment(23)</h3>
                    <div>
                      <FormComment
                        user={user}
                        articleId={id}
                      />
                      <CommentList articleId={id} comments={comment} reply={reply} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className={styles.pf_pre}>
                <div className={styles.pf_user}>
                  <img src={user.image} />
                  <div className={styles.name}>
                    <label>{user.fullname} </label>
                  </div>
                </div>
                <div className={styles.pf_desc}>
                  <p>
                    Love to build Web Apps A journey of Full Stack Developer!
                  </p>
                </div>
                <Follower articleUser = {user} />
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
