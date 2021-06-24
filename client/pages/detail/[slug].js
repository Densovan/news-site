import React, {useState} from "react";
import { useRouter } from "next/router";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_BY_SLUG, GET_USER } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import { Col, Row, Button, Input, Comment, Tooltip, Avatar } from 'antd';
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
import InputComment from '../../components/controls/inputComment';

const SinglePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [state, setState] = useState({
    comments: [],
    submitting: false,
    value: '',
  });
  const { loading, data } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
  });
  const { loading:loading_user, data:user_check } = useQuery(GET_USER);
  if (loading || loading_user)
    return (
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
        {/* <ContentLoader
          width={450}
          height={400}
          viewBox="0 0 450 400"
          backgroundColor="#f0f0f0"
          foregroundColor="#dedede"
          // {...props}
        >
          <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
          <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
          <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
        </ContentLoader> */}
      </center>
    );
  const { title, thumnail, des, user, createdAt } = data.get_news_by_slug;
  const result = <Output data={JSON.parse(des)} />;

  const handleSubmit = () => {
    if (!state.value) {
      return;
    }
    setState({
      submitting: true,
    });

    setTimeout(() => {
      setState({
        submitting: false,
        value: '',
        comments: [
          ...state.comments,
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };
  const commentAll = [];
  if (state.comments === undefined) {
    console.log('comment not found');
  } else {
    state.comments.forEach((element) => {
      commentAll.push(element);
    });
  }

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
                  <div style={{ color: '#262e3c' }}>
                    <p>
                      {result}
                    </p>
                  </div>
                  <div className={styles.ct_comment}>
                    <h3>Comment(23)</h3>
                    <div className={styles.ct_pf_cm}>
                      <Comment
                        avatar={
                          <Avatar
                            src={user.image} 
                            alt={user.fullname}
                          />
                        }
                        content={
                          <InputComment
                            onChange={(e) =>
                              setState({ ...state, ['value']: e.target.value })
                            }
                            onSubmit={handleSubmit}
                            submitting={state.submitting}
                            value={state.value}
                          />
                        }
                      />
                      {commentAll.length > 0 && (
                        <CommentList comments={state.comments} />
                      )}
                      <FormComment
                        author="Vann Soklay"
                        avatar="https://dw9to29mmj727.cloudfront.net/products/782009247272.jpg"
                        content="We supply a series of design principles, practical patterns and high quality design
                                            resources (Sketch and Axure), to help people create their product prototypes beautifully
                                            and efficiently."
                        datetime={moment().fromNow()}
                      />
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
                {/* <Button className={styles.btn_flw}>Follow</Button> */}
                {/* { user_check.get_user.id === user.id ? (
                  <Button className={styles.btn_flw}>View Profile</Button>
                ):(
                  <Button onClick={handleFollow} className={styles.btn_flw}>Follow</Button>
                )}  */}
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
