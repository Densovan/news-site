import React, { useState } from "react";
import { Drawer, Affix, Menu, Layout } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import Link from "next/link";
import ActiveLink from "../../components/activeLink";

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
      <Affix>
        <Header className="header">
          <div className="container">
            <div className="logo">LOGO</div>
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
                <ActiveLink activeClassName="is-active" href="/allnews">
                  <a>News</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="2">
                <ActiveLink activeClassName="is-active" href="/learn">
                  <a>Learns</a>
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="3">
                <ActiveLink activeClassName="is-active" href="/2">
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
      </Affix>
    </React.Fragment>
  );
};

export default MainNavbar;
