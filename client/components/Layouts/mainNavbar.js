import React, { useState } from "react";
import { Drawer, Affix, Menu, Layout } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import Link from "next/link";
import ActiveLink from "../../components/activeLink";
import { FaBars } from "react-icons/fa";

const MainNavbar = () => {
  const [state, setState] = useState({
    visible: false,
  });

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
      <div className="mobile-navbar">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item onClick={showDrawer}>
            <FaBars size={30} />
          </Menu.Item>
          <Link href="/">
            <img
              alt="img"
              className="logo-mobile"
              style={{ height: "40px" }}
              src="/img/transparent back-3.png"
            />
          </Link>
        </Menu>
      </div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={state.visible}
        // key={placement}
      ></Drawer>
      {/* </Affix> */}
    </React.Fragment>
  );
};

export default MainNavbar;
