import React from "react";
import { FiMail } from "react-icons/fi";
import { Divider } from "antd";
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

const TopNavbar = () => {
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
    </React.Fragment>
  );
};

export default TopNavbar;
