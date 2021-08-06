import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import {
  Drawer,
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
import { QuestionCircleOutlined } from "@ant-design/icons";
import { HiOutlineBell, HiOutlineDotsHorizontal } from "react-icons/hi";
const { SubMenu } = Menu;
const { Header } = Layout;
import Link from "next/link";
import ActiveLink from "../../components/activeLink";
import { HiMenu } from "react-icons/hi";
import AuthContext from "../../contexts/authContext";
import Logout from "../Layouts/logout";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_NOTIFICATION_BY_USER,
  GET_NOTIFICATION_CHECK_BY_USER,
  GET_USER,
} from "../../graphql/query";
import {
  NOTIFICATION_CHECK,
  DELETE_COMMENT_NOTIFICATION,
  DELETE_REPLY_IN_NOTI,
  DELETE_LIKE_NOTIFICATION,
} from "../../graphql/mutation";
import { TiUser, TiUserAdd } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";
import Notification from "../common/notification";

const { Content } = Layout;
const GlobalHeader = () => {
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [state, setState] = useState({
    visible: false,
  });

  const { loggedIn } = useContext(AuthContext);
  const { loading, data, error } = useQuery(GET_USER);
  const { loading: laoding_notification, data: notification } = useQuery(
    GET_NOTIFICATION_BY_USER,
    {
      pollInterval: 500,
    }
  );
  const {
    loading: loading_check_notification,
    data: check_notification,
    fetchMore,
  } = useQuery(GET_NOTIFICATION_CHECK_BY_USER, {
    variables: { limit: 100, offset: 0 },
    pollInterval: 500,
  });
  const [checkNotifications] = useMutation(NOTIFICATION_CHECK);
  const [deleteCommentNotification] = useMutation(DELETE_COMMENT_NOTIFICATION);
  const [deleteReplyNotification] = useMutation(DELETE_REPLY_IN_NOTI);
  const [deleteLikeNotification] = useMutation(DELETE_LIKE_NOTIFICATION);

  useEffect(() => {
    if (check_notification === undefined) return;
    if (check_notification.get_notification_check_by_user.length > 0)
      setNotifications(check_notification.get_notification_check_by_user);
  });

  if (loading || laoding_notification || loading_check_notification) return "";
  const showDrawer = () => {
    setState({
      visible: true,
    });
  };
  const onClose = () => {
    setState({
      visible: false,
    });
  };
  return (
    <React.Fragment>
      {/* <Affix> */}
      <Header className="header">
        <div className="navbar-container">
          <div className="logo" style={{ marginRight: 18 }}>
            <Link href="/">
              <img height="100%" src="/assets/images/logo.png" />
            </Link>
          </div>
          <div>
            <Menu mode="horizontal">
              <Menu.Item className="navbar-text" key="1">
                <ActiveLink activeClassName="is-active" href="/">
                  <a>Home</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item className="navbar-text" key="2">
                <ActiveLink activeClassName="is-active" href="/news">
                  <a>News</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="3">
                <ActiveLink activeClassName="is-active" href="/learns">
                  <a>Learns</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="4">
                <ActiveLink activeClassName="is-active" href="/features">
                  <a>Features</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="5">
                <ActiveLink activeClassName="is-active" href="/about">
                  <a>About Us</a>
                </ActiveLink>
              </Menu.Item>
            </Menu>
          </div>
          <div>
            {loggedIn === false && (
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
            {loggedIn === true && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Badge
                  count={notification.get_notification_by_user.length}
                  overflowCount={10}
                  // style={{ marginTop: 6, marginLeft: -10 }}
                >
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
                              <Typography.Title level={5}>
                                Notifications
                              </Typography.Title>
                            </Col>
                          </Row>
                          <Row>
                            {check_notification.get_notification_check_by_user
                              .length === 0 && (
                              <div style={{ paddingLeft: "110px" }}>
                                {/* <h1 style={{ paddingLeft: "146px" }}>Empty</h1> */}
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                              </div>
                            )}
                            {check_notification.get_notification_check_by_user.map(
                              (notifications) => {
                                return (
                                  <Skeleton
                                    avatar
                                    title={false}
                                    style={{
                                      paddingRight: 10,
                                      paddingLeft: 10,
                                    }}
                                    loading={false}
                                    active
                                  >
                                    <div className="container-box">
                                      <Link
                                        href={`/detail/${notifications.news.slug}`}
                                      >
                                        <div className="box-notification">
                                          <div style={{ paddingRight: 8 }}>
                                            <Avatar
                                              src={notifications.user.image}
                                              size={40}
                                            />
                                          </div>
                                          <div>
                                            <strong>
                                              {notifications.user.fullname}{" "}
                                            </strong>{" "}
                                            {notifications.type}{" "}
                                            {notifications.type !==
                                              "follow" && (
                                              <>
                                                {notifications.news.title.substring(
                                                  0,
                                                  45
                                                ) + "..."}
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="icon-menu">
                                        <Popconfirm
                                          okText="Remove"
                                          cancelText="No"
                                          title="Are you sure？"
                                          icon={
                                            <QuestionCircleOutlined
                                              style={{ color: "red" }}
                                            />
                                          }
                                          onConfirm={() => {
                                            if (notifications.type === "like") {
                                              try {
                                                deleteLikeNotification({
                                                  variables: {
                                                    id: notifications.id,
                                                  },
                                                }).then((response) => {
                                                  console.log(response);
                                                });
                                              } catch (e) {
                                                console.log(e);
                                              }
                                            } else if (
                                              notifications.type === "comment"
                                            ) {
                                              try {
                                                deleteCommentNotification({
                                                  variables: {
                                                    id: notifications.id,
                                                  },
                                                }).then((response) => {
                                                  console.log(response);
                                                });
                                              } catch (e) {
                                                console.log(e);
                                              }
                                            } else if (
                                              notifications.type === "reply"
                                            ) {
                                              try {
                                                deleteReplyNotification({
                                                  variables: {
                                                    id: notifications.id,
                                                  },
                                                }).then((response) => {
                                                  console.log(response);
                                                });
                                              } catch (e) {
                                                console.log(e);
                                              }
                                            }
                                          }}
                                          placement="bottom"
                                        >
                                          <div className="delete-notifications">
                                            <HiOutlineDotsHorizontal
                                              fontSize={24}
                                            />
                                          </div>
                                        </Popconfirm>
                                      </div>
                                    </div>
                                  </Skeleton>
                                );
                              }
                            )}
                          </Row>
                          {/* <InfiniteScroll
                            dataLength={
                              check_notification.get_notification_check_by_user
                                .length
                            }
                            next={async () => {
                              fetchMore({
                                variables: {
                                  offset:
                                    check_notification
                                      .get_notification_check_by_user.length,
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) return prev;

                                  if (
                                    fetchMoreResult
                                      .get_notification_check_by_user.length < 8
                                  ) {
                                    setHasMoreItems(false);
                                  }

                                  return Object.assign({}, prev, {
                                    get_notification_check_by_user: [
                                      ...prev.get_notification_check_by_user,
                                      ...fetchMoreResult.get_notification_check_by_user,
                                    ],
                                  });
                                },
                              });
                            }}
                            hasMore={hasMoreItems}
                            loader={
                              <Content style={{ marginTop: "15px" }}>
                                <center>
                                  <Spin></Spin>
                                </center>
                              </Content>
                            }
                            endMessage={null}
                          ></InfiniteScroll> */}
                        </div>
                      </div>
                    }
                    trigger="click"
                  >
                    <div
                      className="notifications"
                      onClick={async () => {
                        try {
                          if (
                            notification.get_notification_by_user.length === 0
                          )
                            console.log("Refresh");
                          else
                            await checkNotifications({
                              variables: { ownerId: data.get_user.id },
                            }).then((response) => {
                              console.log(response);
                            });
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      <HiOutlineBell
                        style={{
                          height: 26,
                          fontSize: 24,
                          color: "#ffffff",
                        }}
                      />
                    </div>
                  </Popover>
                </Badge>
                <Popover
                  placement="bottomRight"
                  content={
                    <div className="dropdown-avatar">
                      <li className="content-avatar">
                        <Link href="/dashboard/profile">
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
                                    {data.get_user.fullname}
                                  </span>
                                </a>
                              </div>
                              <div>
                                <a href="#">
                                  <span className="email">
                                    {data.get_user.email}
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <Divider />
                      <li className="content-text">
                        <Link href="/dashboard/profile">
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li className="content-text">
                        <Link href="/dashboard/addstory">
                          <span>Write a story</span>
                        </Link>
                      </li>
                      <li className="content-text">
                        <Link href="/dashboard/allstories">
                          <span>Stories</span>
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
                    src={data.get_user.image}
                    shape="circle"
                    size="large"
                  />
                </Popover>
              </div>
            )}
          </div>
        </div>
      </Header>
      {/* </Affix> */}

      {/*=========== Tablet and Mobile========== */}
      <Header className="mobile-navbar">
        <div>
          <Menu mode="horizontal">
            <Menu.Item onClick={showDrawer}>
              <HiMenu className="buger-icon" color="#ffffff" size={30} />
            </Menu.Item>
            <Link href="/">
              <img
                alt="img"
                className="logo-mobile"
                style={{ height: "40px" }}
                src="/assets/images/logo.png"
              />
            </Link>
          </Menu>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {loggedIn === false && (
            <div className="top-nav-rigth">
              <TiUser className="gmail-top-nav" />
              <Link href="/signin">Sign in</Link>
              <Divider className="devider-top-nav" type="vertical" />
              <TiUserAdd size={19} className="gmail-top-nav" />
              <Link href="/register">Register</Link>
            </div>
          )}
          {loggedIn === true && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Badge
                count={notification.get_notification_by_user.length}
                overflowCount={10}
                // style={{ marginTop: 6, marginLeft: -10 }}
              >
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
                            <Typography.Title level={5}>
                              Notifications
                            </Typography.Title>
                          </Col>
                        </Row>
                        <Row>
                          {check_notification.get_notification_check_by_user
                            .length === 0 && (
                            <div style={{ paddingLeft: "155px" }}>
                              {/* <h1 style={{ paddingLeft: "146px" }}>Empty</h1> */}
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </div>
                          )}
                          {check_notification.get_notification_check_by_user.map(
                            (notifications) => {
                              return (
                                <Skeleton
                                  avatar
                                  title={false}
                                  style={{
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                  }}
                                  loading={false}
                                  active
                                >
                                  <div className="container-box">
                                    <Link
                                      href={`/detail/${notifications.news.slug}`}
                                    >
                                      <div className="box-notification">
                                        <div style={{ paddingRight: 8 }}>
                                          <Avatar
                                            src={notifications.user.image}
                                            size={40}
                                          />
                                        </div>
                                        <div>
                                          <strong>
                                            {notifications.user.fullname}{" "}
                                          </strong>{" "}
                                          {notifications.type}{" "}
                                          {notifications.type !== "follow" && (
                                            <>
                                              {notifications.news.title.substring(
                                                0,
                                                45
                                              ) + "..."}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                    <div className="icon-menu">
                                      <Popconfirm
                                        okText="Remove"
                                        cancelText="No"
                                        title="Are you sure？"
                                        icon={
                                          <QuestionCircleOutlined
                                            style={{ color: "red" }}
                                          />
                                        }
                                        onConfirm={() => {
                                          if (notifications.type === "like") {
                                            try {
                                              deleteLikeNotification({
                                                variables: {
                                                  id: notifications.id,
                                                },
                                              }).then((response) => {
                                                console.log(response);
                                              });
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          } else if (
                                            notifications.type === "comment"
                                          ) {
                                            try {
                                              deleteCommentNotification({
                                                variables: {
                                                  id: notifications.id,
                                                },
                                              }).then((response) => {
                                                console.log(response);
                                              });
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          } else if (
                                            notifications.type === "reply"
                                          ) {
                                            try {
                                              deleteReplyNotification({
                                                variables: {
                                                  id: notifications.id,
                                                },
                                              }).then((response) => {
                                                console.log(response);
                                              });
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          }
                                        }}
                                        placement="bottom"
                                      >
                                        <div className="delete-notifications">
                                          <HiOutlineDotsHorizontal
                                            fontSize={24}
                                          />
                                        </div>
                                      </Popconfirm>
                                    </div>
                                  </div>
                                </Skeleton>
                              );
                            }
                          )}
                        </Row>
                        {/* <InfiniteScroll
                            dataLength={
                              check_notification.get_notification_check_by_user
                                .length
                            }
                            next={async () => {
                              fetchMore({
                                variables: {
                                  offset:
                                    check_notification
                                      .get_notification_check_by_user.length,
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) return prev;

                                  if (
                                    fetchMoreResult
                                      .get_notification_check_by_user.length < 8
                                  ) {
                                    setHasMoreItems(false);
                                  }

                                  return Object.assign({}, prev, {
                                    get_notification_check_by_user: [
                                      ...prev.get_notification_check_by_user,
                                      ...fetchMoreResult.get_notification_check_by_user,
                                    ],
                                  });
                                },
                              });
                            }}
                            hasMore={hasMoreItems}
                            loader={
                              <Content style={{ marginTop: "15px" }}>
                                <center>
                                  <Spin></Spin>
                                </center>
                              </Content>
                            }mongodb+srv://den:04031998den@newstest.i0md1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
                            endMessage={null}
                          ></InfiniteScroll> */}
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <div
                    className="notifications"
                    onClick={async () => {
                      try {
                        if (notification.get_notification_by_user.length === 0)
                          console.log("Refresh");
                        else
                          await checkNotifications({
                            variables: { ownerId: data.get_user.id },
                          }).then((response) => {
                            console.log(response);
                          });
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    <HiOutlineBell
                      style={{
                        height: 26,
                        fontSize: 24,
                        color: "#ffffff",
                      }}
                    />
                  </div>
                </Popover>
              </Badge>
              <Popover
                placement="bottomRight"
                content={
                  <div className="dropdown-avatar">
                    <li className="content-avatar">
                      <Link href="/dashboard/profile">
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
                                  {data.get_user.fullname}
                                </span>
                              </a>
                            </div>
                            <div>
                              <a href="#">
                                <span className="email">
                                  {data.get_user.email}
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <Divider />
                    <li className="content-text">
                      <Link href="/dashboard/profile">
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li className="content-text">
                      <Link href="/dashboard/addstory">
                        <span>Write a story</span>
                      </Link>
                    </li>
                    <li className="content-text">
                      <Link href="/dashboard/allstories">
                        <span>Stories</span>
                      </Link>
                    </li>
                    <li className="content-text" style={{ paddingBottom: 12 }}>
                      <Link href="/dashboard/editProfile">
                        <span>Settings</span>
                      </Link>
                    </li>
                    <Divider />
                    <li className="content-text" style={{ paddingBottom: 12 }}>
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
                  src={data.get_user.image}
                  shape="circle"
                  size="large"
                />
              </Popover>
            </div>
          )}
        </div>

        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={state.visible}
        >
          <Menu
            style={{
              background: "#262e3c",
              // width: "300px",
            }}
            onClick={onClose}
          >
            <Menu.Item key="1">
              <Link
                className="simple"
                href="/"
                exact
                activeClassName="is-active"
              >
                HOME
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              {" "}
              <Link href="/news" exact activeClassName="is-active">
                NEWS
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link key="3" href="/learns" activeClassName="is-active">
                LEARNS
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link key="4" href="/features" activeClassName="is-active">
                FEATURES
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link href="/about" activeClassName="is-active">
                ABOUT US
              </Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
      {/* )} */}
      {/* </Affix> */}
    </React.Fragment>
  );
};

export default GlobalHeader;
