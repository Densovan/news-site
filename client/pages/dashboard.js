import React, { useContext } from "react";
import { Row, Col } from "antd";
import AuthContext from "../contexts/authContext";
import TopNavbar from "../components/Layouts/topNavbar";
import MainNavbar from "../components/Layouts/mainNavbar";
import Footer from "../components/Layouts/footer";
import { useRouter } from "next/router";
import { FaCamera } from "react-icons/fa";
import Link from "next/link";

const Dashboard = () => {
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
                  <h1>Sovanden</h1>
                </center>
                {/* <div>
                  <h4>Your Stories</h4>
                </div> */}
                <div className="container-profile">
                  <h4>Your Information</h4>
                  <h4></h4>
                </div>
                <br></br>
              </div>
            </Col>
            <Col sm={24} lg={16}>
              <div className="profile-content">
                <div className="sub-pf-content">
                  <h2>Your Post</h2>
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
