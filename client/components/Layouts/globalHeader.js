import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Drawer,
  Input,
  Menu,
  Layout,
  Popover,
  Row,
  Col,
  Divider,
  Avatar,
  Button,
  Badge,
  Empty,
  Typography,
  Skeleton,
  Popconfirm,
  Affix,
} from "antd";
import { HiOutlineBell, HiBell } from 'react-icons/hi';
import Link from "next/link";
import { useAuth } from "../../layouts/layoutAuth";
import Logout from "../actions/logout";
import Notification from "../common/notification";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_NOTIFICATION
} from "../../graphql/query";
import { TiUser, TiUserAdd } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";

const { Search } = Input;
const { Header } = Layout;
const GlobalHeader = () => {
  const { data: notifications } = useQuery(GET_NOTIFICATION);
  const router = useRouter();
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [state, setState] = useState({
    visible: false,
    sum: 0,
    loading: false,
    notifications: null
  });
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = visible => {
    setVisible(visible);
  }
  const { isAuthenticated, user } = useAuth()
  const [authenticate, setAuthenticate] = useState(null)
  useEffect(() => {
    if (user) {
      setAuthenticate(user)
    }
  },[user])

  useEffect(() => {
    let cubes = [];
    let sum = 0;
    let data = [];
    if(notifications){
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
    }
    if(user){
      for (let i = 0; i < cubes.length; i++){
        var cube = cubes[i];
        for (let j = 0; j < cube.length; j++){  
            if (cube[j].user.fullname !== user.user.get_user.fullname || cube[j].type === "follow") {
              sum += cube[j].count;
              data.push(cube[j])
            }
        }
      }
    }

    setState({ sum: sum, notifications: data })

  },[notifications, user])
  // const timeAgo = (time) => {
  //   var created_date = new Date(time * 1000).getTime()/1000;
  //   return <div>{pretty.format(new Date(created_date))}</div>
  // }
  // for (let i = 0; i < cubes.length; i++){
  //   var cube = cubes[i];
  //   for (let j = 0; j < cube.length; j++){  
  //       if (cube[j].user.fullname !== user.user.get_user.fullname || cube[j].type === "follow") {
  //         sum += cube[j].count;
  //         data.push(cube[j])
  //       }
  //   }
  // }

  // var numArray = data;
  // numArray.sort(function(a, b) {
  //   return b.createdAt - a.createdAt;
  // });

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };
  const onSearch = (value) => {
    if (value === "") {
      return;
    }
    router.replace(`/search?keyword=${value}`);
    // setSearch(false);
  };
  const onClose = () => {
    setState({
      visible: false,
    });
  };
  return (
    <React.Fragment>
      <Header className="header">
        <div className="navbar-container">
          <div className="logo" style={{ marginRight: 18 }}>
            <Link href="/">
              <img height="100%" src="/assets/images/logo.png" />
            </Link>
            <Search
              className="input-search"
              placeholder="input search text"
              onSearch={onSearch}
              size="large"
              enterButton
              // allowClear
            />
          </div>
          <div>
            {!isAuthenticated && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="top-nav-rigth">
                  <TiUser className="gmail-top-nav" />
                  <Link href="/signin">Sign in</Link>
                  <Divider className="devider-top-nav" type="vertical" />
                  <TiUserAdd size={19} className="gmail-top-nav" />
                  <Link href="/register">Register</Link>
                </div>
              </div>
            )}
            {isAuthenticated && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Badge count={state.sum} overflowCount={10}>
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
                            <Notification notifications={state.notifications} user={authenticate}/>
                          </Row>
                        </div>
                      </div>
                    }
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                  >
                    <div
                      className="notifications"
                      onClick={async () => {
                        try {
                          setVisible(true)
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      {visible ? <>
                        <HiBell
                        style={{
                          height: 26,
                          paddingLeft: 2,
                          fontSize: 24,
                          color: '#38a7c8',
                        }}
                      />
                      </>
                      :
                      <>
                        <HiOutlineBell
                        style={{
                          height: 26,
                          paddingLeft: 2,
                          fontSize: 24,
                          color: '#ffffff',
                        }}
                      />
                      </>}
                    </div>
                  </Popover>
                </Badge>
                <Popover
                  placement="bottomRight"
                  content={
                    <div className="dropdown-avatar">
                      <li className="content-avatar">
                        <Link href="/dashboard/allstories">
                          <div className="control-avatar">
                            {/* <Avatar
                                className="avatar-1"
                                size="large"
                                src={data.get_user.image}
                              /> */}
                            <div>
                              <div>
                                <a>
                                  <span className="name">
                                  {authenticate !== null && authenticate.user.get_user.fullname}
                                  {/* {user.get_user.fullname} */}
                                  </span>
                                </a>
                              </div>
                              <div>
                                <a href="#">
                                  <span className="email">
                                    {authenticate !== null && authenticate.user.get_user.email}
                                    {/* {user.get_user.email} */}
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <Divider />
                      <li className="content-text">
                        <Link href="/dashboard/allstories">
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li className="content-text">
                        <Link href="/dashboard/addstory">
                          <span>Write a story</span>
                        </Link>
                      </li>
                      <li
                        className="content-text"
                        style={{ paddingBottom: 12 }}
                      >
                        <Link href="/dashboard/editProfile">
                          <span>Settings</span>
                        </Link>
                      </li>
                      <Divider />
                      <li
                        className="content-text"
                        style={{ paddingBottom: 12 }}
                      >
                        <Logout />
                      </li>
                    </div>
                  }
                  trigger="click"
                >
                  <Avatar
                    style={{
                      height: 40,
                      width: 40,
                      paddingTop: 0,
                      marginLeft: 18,
                      cursor: "pointer",
                      border: "solid 2px #ffffff9d",
                    }}
                    src={authenticate !== null && authenticate.user.get_user.image}
                    // src={user.get_user.image}
                    shape="circle"
                    size="large"
                  />
                </Popover>
              </div>
            )}
          </div>
        </div>
      </Header>
    </React.Fragment>
  );
};

export default GlobalHeader;
