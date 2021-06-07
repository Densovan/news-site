import React, { useState, useContext } from "react";
import { Drawer, Affix, Menu, Layout, Popover, Row, Col } from "antd";
import { HiOutlineCog, HiLogout } from "react-icons/hi";
const { SubMenu } = Menu;
const { Header } = Layout;
import Link from "next/link";
import ActiveLink from "../../components/activeLink";
import { HiMenu } from "react-icons/hi";
import AuthContext from "../../contexts/authContext";
import Logout from "../Layouts/logout";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { TiUser, TiUserAdd } from "react-icons/ti";

const MainNavbar = () => {
  const [state, setState] = useState({
    visible: false,
  });

  const { loggedIn } = useContext(AuthContext);
  const { loading, data, error } = useQuery(GET_USER);
  if (loading) return "";

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
          </Menu>
        </div>
      </Header>
      {/* </Affix> */}

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
                  placement="topRight"
                  content={
                    <div className="content-popover" style={{ width: "270px" }}>
                      <Row gutter={[24, 24]}>
                        <Col span={4}>
                          <img
                            className="avatarAcc"
                            src={data.get_user.image}
                          />
                        </Col>
                        <Col span={20}>
                          <div>
                            <div className="popover-text">
                              {data.get_user.fullname}
                            </div>
                            <span>{data.get_user.email}</span>
                          </div>
                        </Col>
                      </Row>

                      <br></br>
                      <Link href="/dashboard">
                        <Row className="accountNavbarhover">
                          <Col style={{ paddingTop: "4px" }} span={4}>
                            <HiOutlineCog style={{ fontSize: "21px" }} />
                          </Col>
                          <Col style={{ paddingTop: "4px" }} span={20}>
                            Dashboard
                          </Col>
                        </Row>
                      </Link>

                      <Row className="accountNavbarhover">
                        <Col style={{ paddingTop: "4px" }} span={4}>
                          <HiLogout style={{ fontSize: "21px" }} />
                        </Col>
                        <Col
                          className="logout"
                          style={{ paddingTop: "4px" }}
                          span={20}
                        >
                          <Logout />
                        </Col>
                      </Row>
                    </div>
                  }
                  trigger="click"
                >
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
