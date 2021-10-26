import React, { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { FiMail } from "react-icons/fi";
import { Divider, Row, Col, Avatar } from "antd";
import { HiOutlineCog, HiQuestionMarkCircle, HiLogout } from "react-icons/hi";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiRss,
  TiMediaPlay,
  TiUser,
  TiUserAdd,
} from "react-icons/ti";
import Link from "next/link";
import { Popover } from "antd";
// import Logout from "../Layouts/logout";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/query";

const TopNavbar = () => {
  const { loggedIn } = useContext(AuthContext);
  const { loading, data, error } = useQuery(GET_USER);
  if (loading) return "";

  return (
    <React.Fragment>
      {loggedIn === false && (
        <div className="nav-top-container">
          <div className="navbar-top">
            <div className="top-nav">
              <FiMail className="gmail-top-nav" />
              <p>sarimsovanden@gmail.com</p>
              <Divider className="devider-top-nav" type="vertical" />
              <div className="top-nav-social">
                <span>
                  <TiSocialFacebook className="top-nav-social-icon" size={20} />
                </span>
                <span>
                  <TiSocialTwitter className="top-nav-social-icon" size={20} />
                </span>
                <span>
                  <TiSocialLinkedin className="top-nav-social-icon" size={20} />
                </span>
                <span>
                  <TiRss className="top-nav-social-icon" size={20} />
                </span>
              </div>
            </div>
            <div>
              <div className="top-nav-rigth">
                <TiUser className="gmail-top-nav" />
                <Link href="/signin">Sign in</Link>
                <Divider className="devider-top-nav" type="vertical" />
                <TiUserAdd size={19} className="gmail-top-nav" />
                <Link href="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {loggedIn === true && (
        <div className="nav-top-container">
          <div className="navbar-top">
            <div className="top-nav">
              <FiMail className="gmail-top-nav" />
              <p>sarimsovanden@gmail.com</p>
              <Divider className="devider-top-nav" type="vertical" />
              <div className="top-nav-social">
                <span>
                  <TiSocialFacebook className="top-nav-social-icon" size={20} />
                </span>
                <span>
                  <TiSocialTwitter className="top-nav-social-icon" size={20} />
                </span>
                <span>
                  <TiSocialLinkedin className="top-nav-social-icon" size={20} />
                </span>
                <span>
                  <TiRss className="top-nav-social-icon" size={20} />
                </span>
              </div>
            </div>
            <div>
              <div style={{ cursor: "pointer" }}>
                <Popover
                  content={
                    <div className="content-popover" style={{ width: "270px" }}>
                      <Row gutter={[24, 24]}>
                        <Col span={4}>
                          <img
                            className="avatarAcc"
                            src={data.get_user.image}
                          />
                        </Col>
                        <Col span={20}>
                          <div>
                            <div className="popover-text">
                              {data.get_user.fullname}
                            </div>
                            <span>{data.get_user.email}</span>
                          </div>
                        </Col>
                      </Row>

                      <br></br>
                      <Link href="/dashboard">
                        <Row className="accountNavbarhover">
                          <Col style={{ paddingTop: "4px" }} span={4}>
                            <HiOutlineCog style={{ fontSize: "21px" }} />
                          </Col>
                          <Col style={{ paddingTop: "4px" }} span={20}>
                            Dashboard
                          </Col>
                        </Row>
                      </Link>
                      {/* <Row className="accountNavbarhover">
                        <Col style={{ paddingTop: "4px" }} span={4}>
                          <HiQuestionMarkCircle style={{ fontSize: "21px" }} />
                        </Col>
                        <Col style={{ paddingTop: "4px" }} span={20}>
                          Help
                        </Col>
                      </Row> */}
                      {/* {data.get_user.role === "admin" && (
                        <Row className="accountNavbarhover">
                          <Col style={{ paddingTop: "4px" }} span={4}>
                            <HiQuestionMarkCircle
                              style={{ fontSize: "21px" }}
                            />
                          </Col>
                          <Col style={{ paddingTop: "4px" }} span={20}>
                            Dashboard
                          </Col>
                        </Row>
                      )} */}
                      <Row className="accountNavbarhover">
                        <Col style={{ paddingTop: "4px" }} span={4}>
                          <HiLogout style={{ fontSize: "21px" }} />
                        </Col>
                        <Col
                          className="logout"
                          style={{ paddingTop: "4px" }}
                          span={20}
                        >
                          <Logout />
                        </Col>
                      </Row>
                    </div>
                  }
                  trigger="click"
                >
                  <img className="avatar" src={data.get_user.image} />
                </Popover>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TopNavbar;
