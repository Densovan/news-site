import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import moment from 'moment';
import {
  Drawer,
  Affix,
  Menu,
  Layout,
  Popover,
  Row,
  Col,
  Divider,
  Dropdown,
  Avatar,
  Button,
  Badge,
  List, 
  Typography
} from "antd";
import {
  HiOutlineCog,
  HiLogout,
  HiOutlineLogout,
  HiOutlineBookOpen,
  HiOutlinePencil,
  HiOutlineUser,
  HiOutlineBell
} from "react-icons/hi";
const { SubMenu } = Menu;
const { Header } = Layout;
import Link from "next/link";
import ActiveLink from "../../components/activeLink";
import { HiMenu } from "react-icons/hi";
import AuthContext from "../../contexts/authContext";
import Logout from "../Layouts/logout";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION_BY_USER, GET_NOTIFICATION_CHECK_BY_USER, GET_USER } from "../../graphql/query";
import { TiUser, TiUserAdd } from "react-icons/ti";

const MainNavbar = () => {
  const [state, setState] = useState({
    visible: false,
  });

  const { loggedIn } = useContext(AuthContext);
  const { loading, data, error } = useQuery(GET_USER);
  const { loading:laoding_notification, data:notification } = useQuery(GET_NOTIFICATION_BY_USER);
  const { loading: loading_check_notification, data:check_notification } = useQuery(GET_NOTIFICATION_CHECK_BY_USER)
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
  console.log(check_notification.get_notification_check_by_user);
  return (
    <React.Fragment>
      {loggedIn === false && (
        <Header className="header">
          <div className="navbar-container">
            <Link href="/">
              <img className="logo" src="/assets/images/logo.png" />
            </Link>
            <Menu
              className="left-bar"
              // theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={["2"]}
            >
              <Menu.Item className="navbar-text" key="0">
                <ActiveLink activeClassName="is-active" href="/">
                  <a>Home</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item className="navbar-text" key="1">
                <ActiveLink activeClassName="is-active" href="/news">
                  <a>News</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="2">
                <ActiveLink activeClassName="is-active" href="/learns">
                  <a>Learns</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="3">
                <ActiveLink activeClassName="is-active" href="/features">
                  <a>Features</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="4">
                <ActiveLink activeClassName="is-active" href="/about">
                  <a>About Us</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item>
                <div className="top-nav-rigth">
                  <TiUser className="gmail-top-nav" />
                  <Link href="/signin">Sign in</Link>
                  {/* <Divider className="devider-top-nav" type="vertical" />
                  <TiUserAdd size={19} className="gmail-top-nav" />
                  <Link href="/register">Register</Link> */}
                </div>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
      )}

      {loggedIn === true && (
        <Header className="header">
          <div className="navbar-container">
            <Link href="/">
              <img className="logo" src="/assets/images/logo.png" />
            </Link>
            <Menu
              className="left-bar"
              // theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={["2"]}
            >
              <Menu.Item className="navbar-text" key="0">
                <ActiveLink activeClassName="is-active" href="/">
                  <a>Home</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item className="navbar-text" key="1">
                <ActiveLink activeClassName="is-active" href="/news">
                  <a>News</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="2">
                <ActiveLink activeClassName="is-active" href="/learns">
                  <a>Learns</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="3">
                <ActiveLink activeClassName="is-active" href="/features">
                  <a>Features</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="4">
                <ActiveLink activeClassName="is-active" href="/about">
                  <a>About Us</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="5">
                <Badge count={notification.get_notification_by_user.length} overflowCount={10} style={{ marginTop:6, marginLeft: -10 }}>
                  <Popover placement="bottom" content={
                    <div style={{ width: 360, height: '90%' }}>
                      <Row justify="space-between" align="middle" style={{ paddingLeft:8,paddingRight:8, paddingTop: 10 }}>
                        <Col>
                          <Typography.Title level={5}>Notifications</Typography.Title>
                        </Col>
                        <Col>
                          <Link href="/notifications">
                            <Button>Show All</Button>
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        {check_notification.get_notification_check_by_user.map((notifications)=> {
                          return(
                            <List.Item style={{ width: '100%', height: '90%' }}>
                              <List.Item.Meta
                                className="card_notification"
                                style={{ paddingLeft:8,paddingRight:8, borderRadius: 8 }}
                                avatar={<Avatar src={notifications.user.image} size={60}/>}
                                description={
                                  <div>
                                    <a style={{ paddingRight: 10 }}>{notifications.user.fullname}</a>
                                    <span>{notifications.news.title}</span>
                                    <div>
                                      <span style={{ fontSize: 12, color: 'red' }}>{moment(parseInt(notifications.createdAt)).fromNow()}</span>
                                    </div>
                                  </div>}
                              />
                            </List.Item>
                          )
                        })}
                      </Row>
                    </div>
                  } trigger="click">
                    <Button shape="circle" icon={<HiOutlineBell style={{  fontSize: '24px', color: '#08c' }}/>} size="large" />
                  </Popover>
                </Badge>
              </Menu.Item>
              <Menu.Item key="6">
                <div style={{ cursor: "pointer" }}>
                  <Popover
                    placement="bottom"
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
                    <img className="avatar-mobile" src={data.get_user.image} />
                  </Popover>
                </div>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
      )}

      {/*=========== Tablet and Mobile========== */}

      {/* <Affix> */}
      {loggedIn === false && (
        <div>
          <div className="mobile-navbar">
            <Menu theme="dark" mode="horizontal">
              <Menu.Item onClick={showDrawer}>
                <HiMenu className="buger-icon" size={30} />
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
          <Drawer
            title={
              // <Link href="/">
              //   <img
              //     style={{
              //       cursor: "pointer",
              //       maxWidth: "100%",
              //       marginLeft: "-10px",
              //       // height: "100px",
              //     }}
              //     src="/images/vitaminair.png"
              //     alt="logo"
              //   />
              // </Link>
              <div>
                <div>
                  <div className="top-nav-rigth-mobile">
                    <TiUser className="gmail-top-nav-mobile" />
                    <Link href="/signin">Sign in</Link>
                    <br></br>
                    <TiUserAdd size={19} className="gmail-top-nav-mobile" />
                    <Link href="/register">Register</Link>
                  </div>
                </div>
              </div>
            }
            placement="left"
            closable={false}
            onClose={onClose}
            visible={state.visible}
            // width={200}
            // key={placement}
          >
            <Menu
              style={{
                background: "#262e3c",
                width: "280px",
                // paddingLeft: "12px",
              }}
              onClick={onClose}
              className="side-nav"
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
                {/* <Link href="/">
                <img
                  style={{
                    cursor: "pointer",
                    maxWidth: "80%",
                    height: "100px",
                  }}
                  src="/images/vitaminair.png"
                  alt="logo"
                />
              </Link> */}
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
        </div>
      )}
      {loggedIn === true && (
        <div>
          <div className="mobile-navbar">
            <Menu theme="dark" mode="horizontal">
              <Menu.Item onClick={showDrawer}>
                <HiMenu className="buger-icon" size={30} />
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
          <Drawer
            title={
              // <Link href="/">
              //   <img
              //     style={{
              //       cursor: "pointer",
              //       maxWidth: "100%",
              //       marginLeft: "-10px",
              //       // height: "100px",
              //     }}
              //     src="/images/vitaminair.png"
              //     alt="image"
              //   />
              // </Link>
              <div style={{ cursor: "pointer" }}>
                <Popover
                  placement="bottom"
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
                  {/* <Avatar className="avatar-1" size="default" src={data.get_user.image} /> */}
                  <img className="avatar-mobile" src={data.get_user.image} />
                </Popover>
              </div>
            }
            placement="left"
            closable={false}
            onClose={onClose}
            visible={state.visible}
            // width={200}
            // key={placement}
          >
            <Menu
              style={{
                background: "#262e3c",
                width: "280px",
                // paddingLeft: "12px",
              }}
              onClick={onClose}
              className="side-nav"
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
                {/* <Link href="/">
                <img
                  style={{
                    cursor: "pointer",
                    maxWidth: "80%",
                    height: "100px",
                  }}
                  src="/images/vitaminair.png"
                  alt="logo"
                />
              </Link> */}
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
        </div>
      )}

      {/* </Affix> */}
    </React.Fragment>
  );
};

export default MainNavbar;
