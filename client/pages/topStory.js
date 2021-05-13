import React from "react";
import { Row, Col, Button, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const TopStory = () => {
  return (
    <div className="container">
      <div>
        <Row gutter={[32, 32]}>
          <Col sm={17}>
            <br></br>
            <h1>Top Stories</h1>

            {/*======================= The last news =================== */}

            <Row>
              <Col span={24}>
                <div className="lasts-news-card">
                  <div
                    className="lasts-news-style"
                    style={{
                      backgroundImage: `url("https://cdn.decrypt.co/resize/1400/wp-content/uploads/2021/01/elon-musk-microphones-gID_4.jpg")`,
                    }}
                  ></div>
                  <div className="content-lasts-news">
                    <h1>
                      Crypto Leaders React to Elon Musk’s Bitcoin Environment
                      Bombshell
                    </h1>
                    <h1 className="status-news-topstory">
                      News{" "}
                      <span>
                        <CaretRightOutlined style={{ fontSize: "10px" }} />
                      </span>{" "}
                      Coin
                    </h1>
                    <p className="data-last-news">Sovanden : 03/03/2021</p>
                    <button className="readmore-last-news">
                      Read More <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
            <Divider></Divider>
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={9}>
                <div
                  className="news-topstory-style"
                  style={{
                    backgroundImage: `url("https://cdn.decrypt.co/resize/1400/wp-content/uploads/2021/03/shutterstock_1625495629-1-gID_4.jpg")`,
                  }}
                ></div>
              </Col>
              <Col xs={24} sm={15}>
                <h2>SEC Pours Cold Water on Bitcoin Futures Market</h2>
                <p>
                  Like any other futures contract for a commodity or stock,
                  Bitcoin futures give investors the chance to speculate on the
                  future price of Bitcoin. In the SEC’s statement
                </p>
                <h1 className="status-news-topstory">
                  News{" "}
                  <span>
                    <CaretRightOutlined style={{ fontSize: "10px" }} />
                  </span>{" "}
                  Coin
                </h1>
                <small>Sovanden : 03/03/2021</small>
                <button className="readmore">
                  Read More <span>&rarr;</span>
                </button>
              </Col>
              <Divider style={{ margin: "0px" }}></Divider>
              <Col sm={9}>
                <div
                  className="news-topstory-style"
                  style={{
                    backgroundImage: `url("https://cdn.decrypt.co/resize/1400/wp-content/uploads/2021/03/shutterstock_1625495629-1-gID_4.jpg")`,
                  }}
                ></div>
              </Col>

              <Col sm={15}>
                <h2>SEC Pours Cold Water on Bitcoin Futures Market</h2>
                <p>
                  Like any other futures contract for a commodity or stock,
                  Bitcoin futures give investors the chance to speculate on the
                  future price of Bitcoin. In the SEC’s statement
                </p>
                <h1 className="status-news-topstory">
                  News{" "}
                  <span>
                    <CaretRightOutlined style={{ fontSize: "10px" }} />
                  </span>{" "}
                  Coin
                </h1>
                <small>Sovanden : 03/03/2021</small>
                <button className="readmore">
                  Read More <span>&rarr;</span>
                </button>
              </Col>
            </Row>
          </Col>

          <Col sm={7}>
            <br></br>
            <h1>Learn</h1>
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
                        NEAR is a smart contract-capable blockchain that's
                        designed...
                      </p>
                      <h1 className="status-news-topstory">
                        Learn{" "}
                        <span>
                          <CaretRightOutlined style={{ fontSize: "10px" }} />
                        </span>{" "}
                        Coin
                      </h1>
                      <small>Sovanden : 03/03/2021</small>
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
                        backgroundImage: `url("https://cdn.decrypt.co/resize/1400/wp-content/uploads/2021/04/Algorand-gID_5-pID_5.png")`,
                      }}
                    ></div>
                    <div className="content-learn">
                      <h3>What is Algorand? A Speedy.....</h3>
                      <p>
                        NEAR is a smart contract-capable blockchain that's
                        designed...
                      </p>
                      <h1 className="status-news-topstory">
                        Learn{" "}
                        <span>
                          <CaretRightOutlined style={{ fontSize: "10px" }} />
                        </span>{" "}
                        Coin
                      </h1>
                      <small>Sovanden : 03/03/2021</small>
                      <button className="readmore-learn">
                        Read More <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TopStory;
