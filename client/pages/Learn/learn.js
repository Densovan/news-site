import React from "react";
import { Row, Col, Button, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";

const Learn = () => {
  return (
    <React.Fragment>
      <br></br>
      <h1 className="top-title">Learn</h1>
      <div>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div className="learn-card">
              <div
                className="learn-style"
                style={{
                  backgroundImage: `url("https://cdn.decrypt.co/resize/1400/wp-content/uploads/2021/04/Algorand-gID_5-pID_5.png")`,
                }}
              ></div>
              <div className="content-learn">
                <h3>What is Algorand? A Speedy.....</h3>
                <p>
                  NEAR is a smart contract-capable blockchain that's designed...
                </p>
                <h1 className="status-news-topstory">
                  Learn{" "}
                  <span>
                    <CaretRightOutlined style={{ fontSize: "10px" }} />
                  </span>{" "}
                  Coin
                </h1>
                <p className="date-learn ">Sovanden : 03/03/2021</p>
                <button className="readmore-learn">
                  Read More <span>&rarr;</span>
                </button>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="learn-card">
              <div
                className="learn-style"
                style={{
                  backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2021/04/Padlock-gID_6-pID_6.png")`,
                }}
              ></div>
              <div className="content-learn">
                <h3>What is Algorand? A Speedy.....</h3>
                <p>
                  NEAR is a smart contract-capable blockchain that's designed...
                </p>
                <h1 className="status-news-topstory">
                  Learn{" "}
                  <span>
                    <CaretRightOutlined style={{ fontSize: "10px" }} />
                  </span>{" "}
                  Coin
                </h1>
                <p className="date-learn ">Sovanden : 03/03/2021</p>
                <button className="readmore-learn">
                  Read More <span>&rarr;</span>
                </button>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="learn-card">
              <div
                className="learn-style"
                style={{
                  backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2019/11/bitcoin-investment_2-gID_1-pID_1.png")`,
                }}
              ></div>
              <div className="content-learn">
                <h3>What is Algorand? A Speedy.....</h3>
                <p>
                  NEAR is a smart contract-capable blockchain that's designed...
                </p>
                <h1 className="status-news-topstory">
                  Learn{" "}
                  <span>
                    <CaretRightOutlined style={{ fontSize: "10px" }} />
                  </span>{" "}
                  Coin
                </h1>
                <p className="date-learn ">Sovanden : 03/03/2021</p>
                <button className="readmore-learn">
                  Read More <span>&rarr;</span>
                </button>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="learn-card">
              <div
                className="learn-style"
                style={{
                  backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2020/12/facebook-diem-gID_4.jpg")`,
                }}
              ></div>
              <div className="content-learn">
                <h3>What is Algorand? A Speedy.....</h3>
                <p>
                  NEAR is a smart contract-capable blockchain that's designed...
                </p>
                <h1 className="status-news-topstory">
                  Learn{" "}
                  <span>
                    <CaretRightOutlined style={{ fontSize: "10px" }} />
                  </span>{" "}
                  Coin
                </h1>
                <p className="date-learn ">Sovanden : 03/03/2021</p>
                <button className="readmore-learn">
                  Read More <span>&rarr;</span>
                </button>
              </div>
            </div>
          </Col>
          <h3 className="all-learn-btn">
            <Link href="/learns">
              <a>
                All Learn <span>&rarr;</span>
              </a>
            </Link>
          </h3>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Learn;
