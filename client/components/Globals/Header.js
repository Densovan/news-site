import React, { Fragment, useState, useEffect } from 'react';

import {
  Layout,
  Button,
  Dropdown,
  Menu,
  Space,
  Input,
  Badge,
  Popover,
  Row,
  Col,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { useAuth } from '../../layouts/layoutAuth';
import { MdNotificationsNone, MdArrowDropDown } from 'react-icons/md';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTIFICATION } from '../../graphql/query';
import { SHOW_NOTIFICATION } from '../../graphql/mutation';
import FilterNavbar from '../Layouts/filterNavbar';
import Notification from '../common/notification';
import Profile from '../common/profile';

const Header = () => {
  //notification
  const { data: notifications } = useQuery(GET_NOTIFICATION);
  const [showNotifications] = useMutation(SHOW_NOTIFICATION);
  const router = useRouter();
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [state, setState] = useState({
    visible: false,
    sum: 0,
    loading: false,
    notifications: null,
  });

  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const { isAuthenticated, user } = useAuth();
  const [authenticate, setAuthenticate] = useState(null);
  useEffect(() => {
    if (user) {
      setAuthenticate(user);
    }
  }, [user]);
  useEffect(() => {
    let cubes = [];
    let data = [];
    let sum = 0;

    if (notifications) {
      notifications.get_news_notification.forEach((notification) => {
        if (notification.follow) {
          cubes.push(notification.follow);
        } else if (notification.comment) {
          cubes.push(notification.comment);
        } else if (notification.reply) {
          cubes.push(notification.reply);
        } else if (notification.vote) {
          cubes.push(notification.vote);
        } else if (notification.news) {
          notification.news.map((item) => {
            cubes.push(item);
          });
        }
      });
      if (user) {
        for (let i = 0; i < cubes.length; i++) {
          var cube = cubes[i];
          if (
            cube.user.fullname !== user.user.get_user.fullname ||
            cube.type === 'follow' ||
            cube.type === 'reply'
          ) {
            data.push(cube);
            const result = cube.notifications.filter(
              (item) => item.user.accountId === user.user.get_user.accountId,
            );
            if (result.length == 0) {
              sum += 0;
            } else {
              sum += result[0].count;
            }
          }
        }
      }
    }
    if (data.length > 0) {
      setState({ sum: sum, notifications: data });
    }
  }, [notifications, user]);

  const handleProfileClick = () => {
    console.log('hello');
  };
  const onSearch = () => {
    console.log('search');
  };
  const handleMenuClick = (visible) => {
    setVisible(visible);
  };

  return (
    <Fragment>
        <Layout.Header
          className="header"
          style={{
            backgroundColor: '#EDEDED',
            height: '64px',
            lineHeight: '64px',
          }}
        >
          <div className="navbar-container">
            <div className="logo">
              <img src="/assets/images/logo_koompi.png" height="100%" />
            </div>
            <div className="center">
              <div>
                <Input.Search
                  className="inputSearch"
                  placeholder="input search text"
                  onSearch={onSearch}
                  size="large"
                  enterButton
                />
              </div>
            </div>
            <div className="right">
              <Space size={12}>
                <div>
                  <Badge count={state.sum} overflowCount={99}>
                    <Dropdown
                      onClick={handleProfileClick}
                      placement="bottomRight"
                      overlay={
                        <Menu style={{ backgroundColor: 'white' }}>
                          <div className="contain-notification">
                            <div className="drop-notification">
                              <Row
                                justify="space-between"
                                align="middle"
                                className="header-notification"
                              >
                                <Col>
                                  <div style={{ color: 'black', fontWeight: "bold", fontSize: "18px"}}>
                                    Notifications
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Notification
                                  notifications={state.notifications}
                                  user={authenticate}
                                  handleMenuClick={handleMenuClick}
                                />
                              </Row>
                            </div>
                          </div>
                        </Menu>
                      }
                      trigger={['click']}
                      onVisibleChange={handleVisibleChange}
                      visible={visible}
                    >
                      <div className="dropdownBox">
                        <MdNotificationsNone
                          style={{
                            color: '#C1C1C1',
                            fontSize: '24px',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: ' translate(-50%,-50%)',
                          }}
                        />
                      </div>
                    </Dropdown>
                  </Badge>
                </div>
                <div>
                  <Dropdown
                    onClick={handleProfileClick}
                    placement="bottomRight"
                    overlay={<Profile />}
                    trigger={['click']}
                  >
                    <div className="dropdownBox">
                      <MdArrowDropDown
                        style={{
                          color: '#C1C1C1',
                          fontSize: '24px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: ' translate(-50%,-50%)',
                        }}
                      />
                    </div>
                  </Dropdown>
                </div>
              </Space>
            </div>
          </div>
        </Layout.Header>
    </Fragment>
  );
};

export default Header;
