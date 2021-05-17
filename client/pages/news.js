import React from "react";
import { Row, Col, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";

const AllNews = () => {
  return (
    <React.Fragment>
      <div className="container">
        <center>
          <h1 className="top-title-allNews">All News</h1>
        </center>
        <Divider></Divider>
        <Row>
          <Col sm={24} md={7}>
            <div className="news-cat">
              <h2 className="title-cat">Categories</h2>
              <div
                className="scroll-newscate"
                // style={{
                //   width: "300px",
                //   border: "1px solid rgba(4, 47, 130, 0.3)",
                //   padding: "0 !important",
                // }}
              >
                <div>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>hehh</span>
                    </div>
                  </Link>
                  {/* {data.allJobCategories.map((res, index) => {
                    return (
                      <Link to={`/jobcategory/${res.id}`}>
                        <div
                          className="listJobCate"
                          style={{ padding: "12px" }}
                        >
                          <span
                            key={res.id}
                            style={{ color: "rgba(0, 0, 0, 0.65)" }}
                          >
                            {res.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })} */}
                </div>
              </div>
            </div>
          </Col>
          <Col sm={24} md={17}>
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
                <p className="date-news">Sovanden : 03/03/2021</p>
                <button className="readmore">
                  Read More <span>&rarr;</span>
                </button>
              </Col>
              <Divider style={{ margin: "0px" }}></Divider>
              <Col xs={24} sm={24} md={8} lg={9}>
                <div
                  className="news-topstory-style"
                  style={{
                    backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2020/12/facebook-diem-gID_4.jpg")`,
                  }}
                ></div>
              </Col>

              <Col xs={24} sm={24} md={16} lg={15}>
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
                <p className="date-news">Sovanden : 03/03/2021</p>
                <button className="readmore">
                  Read More <span>&rarr;</span>
                </button>
              </Col>
              <Divider style={{ margin: "0px" }}></Divider>
              <Col xs={24} sm={24} md={8} lg={9}>
                <div
                  className="news-topstory-style"
                  style={{
                    backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2021/04/Tesla-gID_4.jpg")`,
                  }}
                ></div>
              </Col>

              <Col xs={24} sm={24} md={16} lg={15}>
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
                <p className="date-news">Sovanden : 03/03/2021</p>
                <button className="readmore">
                  Read More <span>&rarr;</span>
                </button>
              </Col>
              <Divider style={{ margin: "0px" }}></Divider>
              <Col xs={24} sm={24} md={8} lg={9}>
                <div
                  className="news-topstory-style"
                  style={{
                    backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2020/02/shutterstock_6361397451-gID_2.jpg")`,
                  }}
                ></div>
              </Col>

              <Col xs={24} sm={24} md={16} lg={15}>
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
                <p className="date-news">Sovanden : 03/03/2021</p>
                <button className="readmore">
                  Read More <span>&rarr;</span>
                </button>
              </Col>
              <Divider style={{ margin: "0px" }}></Divider>
              <Col xs={24} sm={24} md={8} lg={9}>
                <div
                  className="news-topstory-style"
                  style={{
                    backgroundImage: `url("https://cdn.decrypt.co/resize/600/wp-content/uploads/2019/11/euro-gID_1.jpg")`,
                  }}
                ></div>
              </Col>

              <Col xs={24} sm={24} md={16} lg={15}>
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
                <p className="date-news">Sovanden : 03/03/2021</p>
                <button className="readmore">
                  Read More <span>&rarr;</span>
                </button>
              </Col>
              <Divider style={{ margin: "0px" }}></Divider>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AllNews;
