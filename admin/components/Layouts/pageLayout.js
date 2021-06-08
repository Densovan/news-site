import React, { Fragment, useState } from "react";
import { Layout } from "antd";
import SiderBar from "./siderBar";
import TopNavbar from "./topNavbar";
import Footer  from "./footer";

const { Content } = Layout;

const PageLayout = ({ children }) => {

  const [state, setState] = useState({
    collapsed: false
  });
  
  const toggle = () => {
    setState({
        collapsed: !state.collapsed
    })
  }

  return (
    <Fragment>
      <Layout>
        <SiderBar trigger={null} collapsed={state.collapsed}/>
        <Layout className="site-layout">
          <TopNavbar collapsed={state.collapsed} toggle={toggle} />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 18,
              minHeight: 768,
            }}
          >
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default PageLayout;
