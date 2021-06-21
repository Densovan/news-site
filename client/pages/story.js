import { Row, Col, Divider, Badge, Tag, Button } from 'antd';
import { Fragment } from 'react';
import MainNavbar from "../components/Layouts/mainNavbar";
import styles from '../styles/story.module.css';

const Story = () => {
    return(
        <Fragment>
            <MainNavbar/>
            <div className="container">
                <Row gutter={[16, 16]} className={styles.content}>
                    <Col span={14}>
                        <div className={styles.head_stroy}>
                            <div className={styles.box_story}>
                                <img src="https://flxt.tmsimg.com/assets/p170620_p_v10_an.jpg"/>
                                <div className={styles.badge}>
                                    <span>1</span>
                                </div>
                            </div>
                            <div className={styles.box_story}>
                                <img src="https://flxt.tmsimg.com/assets/p170620_p_v10_an.jpg"/>
                                <div className={styles.badge}>
                                    <span>16</span>
                                </div>
                            </div>
                            <div className={styles.box_story}>
                                <img src="https://flxt.tmsimg.com/assets/p170620_p_v10_an.jpg"/>
                                <div className={styles.badge}>
                                    <span>1</span>
                                </div>

                            </div>
                        </div>
                        <Divider className={styles.line}/>
                        <div>
                            <div className={styles.card_contain}>

                            </div>
                        </div>
                    </Col>
                    <Col span={1} style={{ marginRight: 8 }}>
                        <div className={styles.line_right}></div>
                    </Col>
                    <Col span={8}>
                        <div className={styles.contain_topic}>
                            <h3>RECOMMENDED TOPICS</h3>
                            <div className={styles.contain_category}>
                                <Tag className={styles.chip}>
                                    Desgin
                                </Tag>
                                <Tag className={styles.chip}>
                                    Technology
                                </Tag>
                                <Tag className={styles.chip}>
                                    Data Science
                                </Tag>
                                <Tag className={styles.chip}>
                                    Machine Learning
                                </Tag>
                            </div>  
                        </div>
                        <Divider className={styles.line_border }/>
                        <div className={styles.contain_follow}>
                            <div className={styles.title}>
                                <p>Who to follow</p>
                            </div>
                            <div className={styles.card_user_follow}>
                                <div className={styles.contain_user}>
                                    <div className={styles.box_img}>
                                        <img src="https://images.daznservices.com/di/library/GOAL/ee/fd/cristiano-ronaldo-juventus-2020-21_2fgaj1dqcci211r6twgba69qh.jpg?t=1954725721&quality=100"/>
                                    </div>
                                    <div className={styles.text}>
                                        <a href="#">
                                            <h2>Vann Soklay</h2>
                                            <div className={styles.desc}>
                                                <p>New York-based Australian Comedian & Cartoonist for the New Yorker. Obsessed with productivity hacks, the creative process, and the Oxford comma.</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <Button  className={styles.btn_follow}>
                                        Follow
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.card_user_follow}>
                                <div className={styles.contain_user}>
                                    <div className={styles.box_img}>
                                        <img src="https://cdn.vox-cdn.com/thumbor/-Qzy_sfh8Oap-rSlIPuwwwebUNk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22530217/1318321279.jpg"/>
                                    </div>
                                    <div className={styles.text}>
                                        <a href="#">
                                            <h2>Den Sovann</h2>
                                            <div className={styles.desc}>
                                                <p>New York-based Australian Comedian & Cartoonist for the New Yorker. Obsessed with productivity hacks, the creative process, and the Oxford comma.</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <Button className={styles.btn_follow}>
                                        Follow
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

export default Story;