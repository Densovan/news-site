import React, { Fragment } from "react";
import { Layout } from "antd";
import SiderBar from "./siderBar";
import TopNavbar from "./topNavbar";

const { Content } = Layout;

const PageLayout = ({ children }) => {
  const collapsed = (collapsed) => {
    console.log(collapsed);
  }
  return (
    <Fragment>
      <Layout>
        <SiderBar />
        <Layout className="site-layout">
          <TopNavbar />
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
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default PageLayout;
