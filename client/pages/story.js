import { Row, Col, Divider, Badge, Tag, Button, Typography, Popover } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Fragment } from 'react';
import MainNavbar from "../components/Layouts/mainNavbar";
import styles from '../styles/story.module.css';
import Link from 'next/link';

const Story = () => {
    const user_profile = (
        <div className={styles.popover_pf}>
            <div className={styles.pf}>
                <div className={styles.contain_pf}>
                    <Avatar size={{ lg: 40, xl: 40, xxl:40 }} src="https://pm1.narvii.com/5705/2f884bde825f5706de2c8762f160ae7d3d9139f8_hq.jpg" />
                    <Link href="/userProfile">Ifeanyi Ibekie</Link>
                </div>
                <div className={styles.pf_desc}>
                    <p>Fullstack JS developer who loves to build apps. Showing you how at reedbarger.com</p>
                </div>
                <Divider />
                <div className={styles.ct_flw}>
                    <div className={styles.t_flw}>
                        1000 Follows
                    </div>
                    <Button className={styles.btn_flw} style={{ borderRadius: 20 }}>Follow</Button>
                </div>
            </div>
        </div>
    )
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
                                <div className={styles.contain_summary}>
                                    <div className={styles.profile}>
                                        <a href="/userProfile">
                                            <Avatar size="small" src="http://wegamers.176.com/GameIM/SNS/Image/20207498811572195346040920"/>
                                            <Popover placement="right" content={user_profile}>
                                                <div className={styles.name}>
                                                    <span>Ifeanyi Ibekie</span>
                                                </div>
                                            </Popover>
                                        </a>
                                    </div>
                                    <a href="#">
                                        <div className={styles.title}>
                                            <h3><Typography.Text>Let’s create a website with Next.js, Antd and deploy with Now.sh</Typography.Text></h3>
                                        </div>
                                    </a>
                                    <div className={styles.desc}>
                                        <p>
                                            After generating your fancy text symbols, you can copy and paste the "fonts" to most websites and text processors. You could use it to generate a fancy Agario name (yep, weird text in agario is probably generated using a fancy text converter similar to this), to generate a creative-looking instagram, facebook, tumblr, or twitter post, for showing up n00bs on Steam, or just for sending messages full of beautiful text to your buddies.
                                        </p>
                                    </div>
                                    <div className={styles.time}>
                                        <div style={{ display: 'flex' }}>
                                            <div className={styles.date}><p>Jun 21, 2021</p></div>
                                            <div className={styles.type}>
                                                <div>News</div>
                                                <div style={{ paddingRight: 2, paddingLeft: 2 }}><CaretRightOutlined/></div>
                                                <div>Bussiness</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.thumain}>
                                    <img src="https://panhara.sgp1.digitaloceanspaces.com/1_htbUdWgFQ3a94PMEvBr_hQ.png"  />
                                    <div className={styles.btn}>
                                        <Button color="#fff" className={styles.btnc}>Bitcoin</Button>
                                    </div>
                                </div>
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
                                <a href="#">
                                    <Tag className={styles.chip}>
                                        Desgin
                                    </Tag>
                                </a>
                                <a href="#">
                                    <Tag className={styles.chip}>
                                        Technology
                                    </Tag>
                                </a>
                                <a href="#">
                                    <Tag className={styles.chip}>
                                        Data Science
                                    </Tag>
                                </a>
                                <a href="#">
                                    <Tag className={styles.chip}>
                                        Machine Learning
                                    </Tag>
                                </a>
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