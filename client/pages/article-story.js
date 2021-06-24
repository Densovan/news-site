import { Fragment, useState } from 'react';
import { Col, Row, Button, Input, Comment, Tooltip, Avatar } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from '@ant-design/icons';
import MainNavbar from '../components/Layouts/mainNavbar';
import styles from '../styles/article-story.module.css';
import moment from 'moment';

import FormComment from '../components/common/comment';
import CommentList from '../components/commentList';
import InputComment from '../components/controls/inputComment';

const ArticleStory = () => {
  const [state, setState] = useState({
    comments: [],
    submitting: false,
    value: '',
  });

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
    <Fragment>
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
                  <img src="https://mk0camerajabberhe53n.kinstacdn.com/wp-content/uploads/2018/01/Sony_A7R_III_Review__1250014.jpg" />
                </div>
                <div className={styles.article_title}>
                  <h1>Introduction to TypeScript</h1>
                </div>
                <div>
                  <div className={styles.pf_user}>
                    <img src="https://dw9to29mmj727.cloudfront.net/products/782009247272.jpg" />
                    <div className={styles.name}>
                      <label>Vann Soklay</label>
                      <div className={styles.time}>
                        <label>Jan 12 · 3 min read</label>
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#262e3c' }}>
                    <p>
                      Text is the exact, original words written by an author.
                      Text is also a specific work as written by the original
                      author. Text is also commonly used to refer to a text
                      message or to send a text message. Text has several other
                      senses as a noun.
                    </p>
                  </div>
                  <div className={styles.ct_comment}>
                    <h3>Comment(23)</h3>
                    <div className={styles.ct_pf_cm}>
                      <Comment
                        avatar={
                          <Avatar
                            src="https://dw9to29mmj727.cloudfront.net/products/782009247272.jpg"
                            alt="Han Solo"
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
                  <img src="https://dw9to29mmj727.cloudfront.net/products/782009247272.jpg" />
                  <div className={styles.name}>
                    <label>Vann Soklay</label>
                  </div>
                </div>
                <div className={styles.pf_desc}>
                  <p>
                    Love to build Web Apps A journey of Full Stack Developer!
                  </p>
                </div>
                <Button className={styles.btn_flw}>Follow</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default ArticleStory;
