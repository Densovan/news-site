import { GET_NOTIFICATION } from '../../graphql/query';
import { useQuery, useMutation } from '@apollo/client';
import { Badge, Popover, Row, Col, Typography, Avatar } from 'antd';
import { HiOutlineBell } from 'react-icons/hi';

const Notification = ({ user }) => {
  const { data: notifications, loading: loading_notifications } =
    useQuery(GET_NOTIFICATION,{
        pollInterval: 500
    });

  if (loading_notifications) {
    <div>Loading....</div>;
  }
  let cubes = [];
  let sum = 0;
  let data = [];
  notifications.get_news_notification.forEach((notification) => {
    if(notification.follow){
        cubes.push(notification.follow)
    }
    if (notification.conversation) {
        cubes.push(notification.conversation)
    }
    if(notification.vote){
        cubes.push(notification.vote)
    }
    if(notification.news){
        cubes.push(notification.news)
    }
  });
  for (let i = 0; i < cubes.length; i++){
    var cube = cubes[i];
    for (let j = 0; j < cube.length; j++){  
        if (cube[j].user.fullname !== user.get_user.fullname) {
            sum += cube[j].count;
            if (cube[j].type === 'follow') {
                data.push(
                    <div className="container-box" style={cube[j].read ? {backgroundColor:"white"} : {backgroundColor: "yellow"}}>
                        <div className="container-box-follow">
                            <div style={{ paddingRight: 8 }}>
                              <Avatar
                                src={cube[j].user.image}
                                size={40}
                              />
                            </div>
                            <div>
                                <strong>
                                    {cube[j].user.fullname}{" "}
                                </strong>{" "}
                                have following on you.
                            </div>
                        </div>
                    </div>
                )
            }
            if (cube[j].type === 'news'){
                data.push(
                    <div className="container-box" style={cube[j].read ? {backgroundColor:"white"} : {backgroundColor: "yellow"}}>
                        <div className="box-notification">
                            <div style={{ paddingRight: 8 }}>
                              <Avatar
                                src={cube[j].user.image}
                                size={40}
                              />
                            </div>
                            <div>
                                <strong>
                                    {cube[j].user.fullname}{" "}
                                </strong>{" "}
                                have post: {" "}
                                {cube[j].news.title}
                            </div>
                        </div>
                    </div>
                  );
            }
            if (cube[j].type === 'comment') {
                data.push(
                  <div className="container-box" style={cube[j].read ? {backgroundColor:"white"} : {backgroundColor: "yellow"}}>
                      <div className="box-notification">
                          <div style={{ paddingRight: 8 }}>
                            <Avatar
                              src={cube[j].user.image}
                              size={40}
                            />
                          </div>
                          <div>
                              <strong>
                                  {cube[j].user.fullname}{" "}
                              </strong>{" "}
                              comment on your post.{" "}
                              {cube[j].news.title}
                          </div>
                      </div>
                  </div>
                );
            }
            if (cube[j].type === 'reply') {
                if (cube[j].userTo.fullname === user.get_user.fullname) {
                  data.push(
                      <div className="container-box" style={cube[j].read ? {backgroundColor:"white"} : {backgroundColor: "yellow"}}>
                          <div className="box-notification">
                              <div style={{ paddingRight: 8 }}>
                                <Avatar
                                  src={cube[j].user.image}
                                  size={40}
                                />
                              </div>
                              <div>
                                  <strong>
                                      {cube[j].user.fullname}{" "}
                                  </strong>{" "}
                                  mentioned you in a comment.{" "}
                                  {cube[j].news.title}
                              </div>
                          </div>
                      </div>
                  );
                }else{
                data.push(
                    <div className="container-box" style={cube[j].read ? {backgroundColor:"white"} : {backgroundColor: "yellow"}}>
                        <div className="box-notification">
                            <div style={{ paddingRight: 8 }}>
                              <Avatar
                                src={cube[j].user.image}
                                size={40}
                              />
                            </div>
                            <div>
                                <strong>
                                    {cube[j].user.fullname}{" "}
                                </strong>{" "}
                                replied to{' '}
                                <strong>
                                    {cube[j].userTo.fullname}{" "}
                                </strong>{" "}
                                on post: {' '}
                                {cube[j].news.title}
                            </div>
                        </div>
                    </div>
                );
                }
            }
            if (cube[j].type === 'up') {
                data.push(
                    <div className="container-box" style={cube[j].read ? {backgroundColor:"white"} : {backgroundColor: "yellow"}}>
                        <div className="box-notification">
                            <div style={{ paddingRight: 8 }}>
                              <Avatar
                                src={cube[j].user.image}
                                size={40}
                              />
                            </div>
                            <div>
                                <strong>
                                    {cube[j].user.fullname}{" "}
                                </strong>{" "}
                                like on your post: {' '}
                                {cube[j].news.title}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
  }
  return (
    <>
      <Badge count={sum} overflowCount={10}>
        <Popover
          placement="bottomRight"
          content={
            <div className="contain-notification">
              <div className="drop-notification">
                <Row
                  justify="space-between"
                  align="middle"
                  className="header-notification"
                >
                  <Col>
                    <Typography.Title level={5}>Notifications</Typography.Title>
                  </Col>
                </Row>
                <Row>
                    {data}
                </Row>
              </div>
            </div>
          }
          trigger="click"
        >
          <div
            className="notifications"
            onClick={async () => {
              try {
                console.log('hello');
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <HiOutlineBell
              style={{
                height: 26,
                fontSize: 24,
                color: '#ffffff',
              }}
            />
          </div>
        </Popover>
      </Badge>
    </>
  );
};

export default Notification;
