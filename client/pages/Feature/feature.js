import React from "react";
import { Row, Col } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";

const Feature = () => {
  return (
    <React.Fragment>
      <br></br>

      <h1 className="top-title">Feature</h1>

      <div>
        <Row gutter={[12, 12]}>
          <Col sm={24} md={8}>
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
                  Feature
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
          <Col sm={24} md={8}>
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
                  Feature
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
          <Col sm={24} md={8}>
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
                  Feature
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
          <Col sm={24} md={8}>
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
                  Feature
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
          <Col sm={24} md={8}>
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
                  Feature
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
          <Col sm={24} md={8}>
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
                  Feature
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
        </Row>
        <br></br>
        <h3 className="all-feature-btn">
          <Link href="/news">
            <a>
              All Feature <span>&rarr;</span>
            </a>
          </Link>
        </h3>
      </div>
    </React.Fragment>
  );
};

export default Feature;
