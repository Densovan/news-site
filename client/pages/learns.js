import React from "react";
import { Col, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  FaCoins,
  FaBusinessTime,
  FaWhmcs,
  FaChartLine,
  FaCommentAlt,
  FaLinode,
  FaRegEdit,
  FaRegClone,
} from "react-icons/fa";
import TopNavbar from "../components/Layouts/topNavbar";
import MainNavbar from "../components/Layouts/mainNavbar";
import Footer from "../components/Layouts/footer";

const Learn = () => {
  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      <div className="container top-learns">
        <center>
          <h1 className="about-main-title">Learn</h1>
        </center>
        <Row>
          <Col sm={24} md={6}>
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
                      <span>
                        {" "}
                        <FaBusinessTime
                          size={20}
                          style={{ marginRight: "7px" }}
                        />
                        Business
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaCoins size={20} style={{ marginRight: "7px" }} />
                        Coin
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaWhmcs size={20} style={{ marginRight: "7px" }} />
                        Technology
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        <FaChartLine size={20} style={{ marginRight: "7px" }} />
                        Maket
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        <FaCommentAlt
                          size={18}
                          style={{ marginRight: "7px" }}
                        />
                        Options
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaRegClone size={20} style={{ marginRight: "7px" }} />
                        Our Company
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        <FaLinode size={18} style={{ marginRight: "7px" }} />
                        DeFi
                      </span>
                    </div>
                  </Link>
                  <Link href="/3">
                    <div className="listnewsCate" style={{ padding: "12px" }}>
                      <span>
                        {" "}
                        <FaRegEdit size={20} style={{ marginRight: "7px" }} />
                        Editor's Pick
                      </span>
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
          <Col sm={24} md={18}>
            <Row gutter={[12, 12]}>
              <Col sm={24} md={12} lg={8}>
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
                    <Row>
                      <Col xs={24} md={16}>
                        <h1 className="status-news-topstory">
                          Learn{" "}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          Coin
                        </h1>
                        <p className="date-learn ">Sovanden : 03/03/2021</p>
                      </Col>
                      <Col xs={24} md={8}>
                        <button className="readmore-learn">
                          Read More <span>&rarr;</span>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm={24} md={12} lg={8}>
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
                      NEAR is a smart contract-capable blockchain that's
                      designed...
                    </p>
                    <Row>
                      <Col xs={24} md={16}>
                        <h1 className="status-news-topstory">
                          Learn{" "}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          Coin
                        </h1>
                        <p className="date-learn ">Sovanden : 03/03/2021</p>
                      </Col>
                      <Col xs={24} md={8}>
                        <button className="readmore-learn">
                          Read More <span>&rarr;</span>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm={24} md={12} lg={8}>
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
                      NEAR is a smart contract-capable blockchain that's
                      designed...
                    </p>
                    <Row>
                      <Col xs={24} md={16}>
                        <h1 className="status-news-topstory">
                          Learn{" "}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          Coin
                        </h1>
                        <p className="date-learn ">Sovanden : 03/03/2021</p>
                      </Col>
                      <Col xs={24} md={8}>
                        <button className="readmore-learn">
                          Read More <span>&rarr;</span>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm={24} md={12} lg={8}>
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
                      NEAR is a smart contract-capable blockchain that's
                      designed...
                    </p>
                    <Row>
                      <Col xs={24} md={16}>
                        <h1 className="status-news-topstory">
                          Learn{" "}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          Coin
                        </h1>
                        <p className="date-learn ">Sovanden : 03/03/2021</p>
                      </Col>
                      <Col xs={24} md={8}>
                        <button className="readmore-learn">
                          Read More <span>&rarr;</span>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm={24} md={12} lg={8}>
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
                      NEAR is a smart contract-capable blockchain that's
                      designed...
                    </p>
                    <Row>
                      <Col xs={24} md={16}>
                        <h1 className="status-news-topstory">
                          Learn{" "}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          Coin
                        </h1>
                        <p className="date-learn ">Sovanden : 03/03/2021</p>
                      </Col>
                      <Col xs={24} md={8}>
                        <button className="readmore-learn">
                          Read More <span>&rarr;</span>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm={24} md={12} lg={8}>
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
                      NEAR is a smart contract-capable blockchain that's
                      designed...
                    </p>
                    <Row>
                      <Col xs={24} md={16}>
                        <h1 className="status-news-topstory">
                          Learn{" "}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          Coin
                        </h1>
                        <p className="date-learn ">Sovanden : 03/03/2021</p>
                      </Col>
                      <Col xs={24} md={8}>
                        <button className="readmore-learn">
                          Read More <span>&rarr;</span>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Learn;
