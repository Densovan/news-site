import React from "react";
import ContentLoader, { rect, circle } from "react-content-loader";
import { Row, Col, Button, Divider } from "antd";

const laoder = () => {
  return (
    <div>
      <Row style={{ marginTop: "-60px" }} gutter={[12, 12]}>
        <Col sm={24} md={12} lg={8}>
          <ContentLoader viewBox="0 0 500 420" height={420} width={400}>
            <rect x="16" y="17" rx="0" ry="0" width="360" height="200" />
            <circle cx="35" cy="248" r="20" />
            <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
            <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
          </ContentLoader>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <ContentLoader
            style={{ marginLeft: "12px" }}
            viewBox="0 0 500 420"
            height={420}
            width={400}
          >
            <rect x="16" y="17" rx="0" ry="0" width="360" height="200" />
            <circle cx="35" cy="248" r="20" />
            <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
            <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
          </ContentLoader>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <ContentLoader
            style={{ marginLeft: "24px" }}
            viewBox="0 0 500 420"
            height={420}
            width={400}
          >
            <rect x="16" y="17" rx="0" ry="0" width="360" height="200" />
            <circle cx="35" cy="248" r="20" />
            <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
            <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
          </ContentLoader>
        </Col>
      </Row>
      <Row style={{ marginTop: "-200px" }} gutter={[12, 12]}>
        <Col sm={24} md={12} lg={8}>
          <ContentLoader viewBox="0 0 500 420" height={420} width={400}>
            <rect x="16" y="17" rx="0" ry="0" width="360" height="200" />
            <circle cx="35" cy="248" r="20" />
            <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
            <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
          </ContentLoader>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <ContentLoader
            style={{ marginLeft: "12px" }}
            viewBox="0 0 500 420"
            height={420}
            width={400}
          >
            <rect x="16" y="17" rx="0" ry="0" width="360" height="200" />
            <circle cx="35" cy="248" r="20" />
            <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
            <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
          </ContentLoader>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <ContentLoader
            style={{ marginLeft: "24px" }}
            viewBox="0 0 500 420"
            height={420}
            width={400}
          >
            <rect x="16" y="17" rx="0" ry="0" width="360" height="200" />
            <circle cx="35" cy="248" r="20" />
            <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
            <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
          </ContentLoader>
        </Col>
      </Row>
    </div>
  );
};

export default laoder;
