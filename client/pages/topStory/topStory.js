import React from "react";
import { Row, Col, Button, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Sound from "react-sound";

const TopStory = () => {
  return (
    <div>
      <br></br>
      <h1 className="top-title">Top Stories</h1>

      {/*======================= The last news =================== */}

      <Row>
        <Col sm={24}>
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

              <Row>
                <Col sm={24} md={18}>
                  <h1 className="status-news-topstory">
                    News{" "}
                    <span>
                      <CaretRightOutlined style={{ fontSize: "10px" }} />
                    </span>{" "}
                    Coin
                  </h1>
                  <p className="data-last-news">Sovanden : 03/03/2021</p>
                </Col>
                <Col sm={24} md={6}>
                  <button className="readmore-last-news">
                    Read More <span>&rarr;</span>
                  </button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Divider></Divider>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={8} lg={9}>
          <div
            className="news-topstory-style"
            style={{
              backgroundImage: `url("https://cdn.decrypt.co/resize/1400/wp-content/uploads/2021/03/shutterstock_1625495629-1-gID_4.jpg")`,
            }}
          ></div>
        </Col>
        <Col xs={24} sm={24} md={16} lg={15}>
          <h2>SEC Pours Cold Water on Bitcoin Futures Market</h2>
          <p>
            Like any other futures contract for a commodity or stock, Bitcoin
            futures give investors the chance to speculate on the future price
            of Bitcoin. In the SEC’s statement
          </p>
          <Row>
            <Col xs={24} md={18}>
              <h1 className="status-news-topstory">
                News{" "}
                <span>
                  <CaretRightOutlined style={{ fontSize: "10px" }} />
                </span>{" "}
                Coin
              </h1>
              <p className="date-news">Sovanden : 03/03/2021</p>
            </Col>
            <Col xs={24} md={6}>
              <button className="readmore">
                Read More <span>&rarr;</span>
              </button>
            </Col>
          </Row>
        </Col>
        <Divider style={{ margin: "0px" }}></Divider>
        <Col sm={9}>
          <div
            className="news-topstory-style"
            style={{
              backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2020/12/facebook-diem-gID_4.jpg")`,
            }}
          ></div>
        </Col>

        <Col sm={15}>
          <h2>SEC Pours Cold Water on Bitcoin Futures Market</h2>
          <p>
            Like any other futures contract for a commodity or stock, Bitcoin
            futures give investors the chance to speculate on the future price
            of Bitcoin. In the SEC’s statement
          </p>
          <Row>
            <Col sm={24} md={18}>
              <h1 className="status-news-topstory">
                News{" "}
                <span>
                  <CaretRightOutlined style={{ fontSize: "10px" }} />
                </span>{" "}
                Coin
              </h1>
              <p className="date-news">Sovanden : 03/03/2021</p>
            </Col>
            <Col sm={24} md={6}>
              <button className="readmore">
                Read More <span>&rarr;</span>
              </button>
            </Col>
          </Row>
        </Col>
        <Divider style={{ margin: "0px" }}></Divider>
        <Col sm={9}>
          <div
            className="news-topstory-style"
            style={{
              backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2021/04/Tesla-gID_4.jpg")`,
            }}
          ></div>
        </Col>

        <Col sm={15}>
          <h2>SEC Pours Cold Water on Bitcoin Futures Market</h2>
          <p>
            Like any other futures contract for a commodity or stock, Bitcoin
            futures give investors the chance to speculate on the future price
            of Bitcoin. In the SEC’s statement
          </p>
          <Row>
            <Col sm={24} md={18}>
              <h1 className="status-news-topstory">
                News{" "}
                <span>
                  <CaretRightOutlined style={{ fontSize: "10px" }} />
                </span>{" "}
                Coin
              </h1>
              <p className="date-news">Sovanden : 03/03/2021</p>
            </Col>
            <Col sm={24} md={6}>
              <button className="readmore">
                Read More <span>&rarr;</span>
              </button>
            </Col>
          </Row>
        </Col>
        <Divider style={{ margin: "0px" }}></Divider>
        <Col sm={9}>
          <div
            className="news-topstory-style"
            style={{
              backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2020/02/shutterstock_6361397451-gID_2.jpg")`,
            }}
          ></div>
        </Col>

        <Col sm={15}>
          <h2>SEC Pours Cold Water on Bitcoin Futures Market</h2>
          <p>
            Like any other futures contract for a commodity or stock, Bitcoin
            futures give investors the chance to speculate on the future price
            of Bitcoin. In the SEC’s statement
          </p>
          <Row>
            <Col sm={24} md={18}>
              <h1 className="status-news-topstory">
                News{" "}
                <span>
                  <CaretRightOutlined style={{ fontSize: "10px" }} />
                </span>{" "}
                Coin
              </h1>
              <p className="date-news">Sovanden : 03/03/2021</p>
            </Col>
            <Col sm={24} md={6}>
              <button className="readmore">
                Read More <span>&rarr;</span>
              </button>
            </Col>
          </Row>
        </Col>
        <Divider style={{ margin: "0px" }}></Divider>
        <Col sm={9}>
          <div
            className="news-topstory-style"
            style={{
              backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2019/11/euro-gID_1.jpg")`,
            }}
          ></div>
        </Col>

        <Col sm={15}>
          <h2>SEC Pours Cold Water on Bitcoin Futures Market</h2>
          <p>
            Like any other futures contract for a commodity or stock, Bitcoin
            futures give investors the chance to speculate on the future price
            of Bitcoin. In the SEC’s statement
          </p>
          <Row>
            <Col sm={24} md={18}>
              <h1 className="status-news-topstory">
                News{" "}
                <span>
                  <CaretRightOutlined style={{ fontSize: "10px" }} />
                </span>{" "}
                Coin
              </h1>
              <p className="date-news">Sovanden : 03/03/2021</p>
            </Col>
            <Col sm={24} md={6}>
              <button className="readmore">
                Read More <span>&rarr;</span>
              </button>
            </Col>
          </Row>
        </Col>
        <Divider style={{ margin: "0px" }}></Divider>
      </Row>
      <br></br>

      <h3 className="all-news-btn">
        <Link href="/news">
          <a>
            All News <span>&rarr;</span>
          </a>
        </Link>
      </h3>
    </div>
  );
};

export default TopStory;
