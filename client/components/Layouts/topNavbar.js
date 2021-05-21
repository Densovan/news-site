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
import Logout from "../Layouts/logout";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

const TopNavbar = () => {
  const { loggedIn } = useContext(AuthContext);
  const { loading, data, error } = useQuery(GET_USER);
  if (loading) return "";
  console.log(data);
  // const { fullname } = data.get_user;
  const content = (
    <div className="content-popover" style={{ width: "270px" }}>
      <Row gutter={[24, 24]}>
        {/* <Col span={4}>
         
          <Avatar
            className="navbar-avata"
            // src={userData.user.avatar}
            src="/assets/images/avatar.png"
            size={55}
          ></Avatar>
        </Col> */}
        <Col span={20}>
          <div>
            <div className="popover-text">{/* {userData.user.fullname} */}</div>
            {/* <span>{userData.user.email}</span> */}
          </div>
        </Col>
      </Row>
      <div className="user-bottom-border"></div>
      <Row className="accountNavbarhover">
        <Col style={{ paddingTop: "4px" }} span={4}>
          <HiOutlineCog style={{ fontSize: "21px" }} />
        </Col>

        <Col style={{ paddingTop: "4px" }} span={20}>
          Setting
        </Col>
      </Row>
      <Row className="accountNavbarhover">
        <Col style={{ paddingTop: "4px" }} span={4}>
          <HiQuestionMarkCircle style={{ fontSize: "21px" }} />
        </Col>
        <Col style={{ paddingTop: "4px" }} span={20}>
          Help
        </Col>
      </Row>
      <Row className="accountNavbarhover">
        <Col style={{ paddingTop: "4px" }} span={4}>
          <HiLogout style={{ fontSize: "21px" }} />
        </Col>
        <Col className="logout" style={{ paddingTop: "4px" }} span={20}>
          <Logout />
        </Col>
      </Row>
    </div>
  );
  return (
    <React.Fragment>
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
            {loggedIn === false && (
              <div className="top-nav-rigth">
                <TiUser className="gmail-top-nav" />
                <Link href="/signin">Sign in</Link>
                <Divider className="devider-top-nav" type="vertical" />
                <TiUserAdd size={19} className="gmail-top-nav" />
                <Link href="/register">Register</Link>
              </div>
            )}
            {loggedIn === true && (
              <div style={{ cursor: "pointer" }}>
                <Popover content={content} title="Sovanden" trigger="click">
                  <img className="avatar" src="/assets/images/avatar.png" />
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopNavbar;
