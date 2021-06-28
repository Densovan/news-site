import { Avatar, Button } from 'antd';
import { Tabs } from 'antd';
import styles from '../styles/userProfile.module.css';

const { TabPane } = Tabs;

const UserProfile = () => {
    const callback = (key) => {
        console.log(key);
    }
    return(
        <div className="container">
            <div className={styles.ct_pf}>
                <div className={styles.content_pf}>   
                    <Avatar size={{ sm: 80, md: 80, lg: 80, xl: 80, xxl: 100 }} src="https://img.olhardigital.com.br/wp-content/uploads/2019/08/20190807092559.jpg" />
                    <div className={styles.ct_total}>
                        <div className={styles.tt_story}>
                            <a href="#">Stories</a>
                            <div>
                                <label>1000</label> 
                            </div>
                        </div>
                        <div className={styles.tt_follower}>
                            <a href="#">Followers</a>
                            <div>
                                <label>200</label>
                            </div>
                        </div>
                    </div>
                </div>
                <Button className={styles.btn_flw}>Follow</Button>
            </div>
            <div>
                <div className={styles.sm_pf}>   
                    <div style={{ marginTop: 10 }}>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                          <TabPane tab="Stories" key="1">
                            Story
                          </TabPane>
                          <TabPane tab="Follower" key="2">
                            Follower
                          </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default UserProfile;