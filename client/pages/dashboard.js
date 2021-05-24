import React, { useContext, useState } from "react";
import { Row, Col } from "antd";
import AuthContext from "../contexts/authContext";
import TopNavbar from "../components/Layouts/topNavbar";
import MainNavbar from "../components/Layouts/mainNavbar";
import Footer from "../components/Layouts/footer";
import { useRouter } from "next/router";
import { FaCamera } from "react-icons/fa";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/query";
import { AiOutlineAppstoreAdd, AiOutlineEdit } from "react-icons/ai";

const Dashboard = () => {
  const [change, setChange] = useState({
    value: "all-story",
  });

  const { loading, data, error } = useQuery(GET_USER);
  if (loading) return "";
  const router = useRouter();
  const { loggedIn } = useContext(AuthContext);
  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      {loggedIn === true && (
        <div className="container">
          <br></br>
          <Row gutter={[12, 12]}>
            <Col sm={24} lg={8}>
              <div className="profile-bg">
                <center>
                  <br></br>
                  <img
                    className="profile-img"
                    src="/assets/images/Den.png"
                  ></img>
                  {/* <div className="uplaod-mg-btn">
                      <FaCamera size={17} />
                    </div> */}
                  <h1>{data.get_user.fullname}</h1>
                </center>
                <div className="container-profile">
                  <h3>Your Information</h3>
                  <div className="hold-info">
                    <h4>Fullname</h4>
                    <p>{data.get_user.fullname}</p>
                  </div>

                  <div className="hold-info">
                    <h4>Email</h4>
                    <p>{data.get_user.email}</p>
                  </div>
                  <h3>Managements</h3>
                  <div className="list-content-pf">
                    <div
                      className={
                        change.value === "all-story"
                          ? "active-list-pf"
                          : "a-list-content-pf"
                      }
                      onClick={() => setChange({ value: "all-story" })}
                      // className="a-list-content-pf"
                    >
                      <span>
                        {" "}
                        <AiOutlineAppstoreAdd
                          size={16}
                          style={{ marginRight: "10px" }}
                        />
                        All Stories
                      </span>
                    </div>
                    <div
                      className={
                        change.value === "add-story"
                          ? "active-list-pf"
                          : "a-list-content-pf"
                      }
                      onClick={() => setChange({ value: "add-story" })}
                      // className="a-list-content-pf"
                    >
                      <span>
                        {" "}
                        <AiOutlineEdit
                          size={16}
                          style={{ marginRight: "10px" }}
                        />
                        Add Story
                      </span>
                    </div>
                  </div>
                </div>
                <br></br>
              </div>
            </Col>
            <Col sm={24} lg={16}>
              <div className="profile-content">
                {change.value === "all-story" && (
                  <div className="sub-pf-content">
                    <h2>Your Stories</h2>
                    <Row>
                      <Col sm={24} md={8}>
                        xzdf
                      </Col>
                      <Col sm={24} md={8}>
                        xzdf
                      </Col>
                      <Col sm={24} md={8}>
                        xzdf
                      </Col>
                    </Row>
                  </div>
                )}
                {/* =============value = add-story=========== */}
                {change.value === "add-story" && (
                  <div className="sub-pf-content">
                    <h2>Add Your Story</h2>
                    <Row>
                      <Col sm={24} md={8}>
                        xzdf
                      </Col>
                      <Col sm={24} md={8}>
                        xzdf
                      </Col>
                      <Col sm={24} md={8}>
                        xzdf
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <br></br>
        </div>
      )}
      {loggedIn === false && window.location.replace("/")}
      <Footer />
    </React.Fragment>
  );
};

export default Dashboard;
