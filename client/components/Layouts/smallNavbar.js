import React from "react";
import { Row, Col, Menu, Button } from "antd";
import ActiveLink from "../../components/activeLink";
import {
  AiOutlineFolderOpen,
  AiOutlineCloudDownload,
  AiOutlineUp,
} from "react-icons/ai";

const smallNavbar = () => {
  return (
    <React.Fragment>
      <div className="small-navbar">
        <div className="sub-small-navbar">
          <ActiveLink href="/" activeClassName="small-navbar-active">
            <div className="sub1-small-navbar">
              <AiOutlineFolderOpen style={{ padding: "0 7px 0 0" }} size={30} />
              <span>NEW</span>
            </div>
          </ActiveLink>
          <ActiveLink href="/topnews" activeClassName="small-navbar-active">
            <div className="sub1-small-navbar">
              <AiOutlineUp style={{ padding: "0 7px 0 0" }} size={30} />
              <span>TOP</span>
            </div>
          </ActiveLink>
          <ActiveLink href="/today" activeClassName="small-navbar-active">
            <div className="sub1-small-navbar">
              <AiOutlineCloudDownload
                style={{ padding: "0 7px 0 0" }}
                size={30}
              />
              <span>TODAY</span>
            </div>
          </ActiveLink>
        </div>
      </div>
    </React.Fragment>
  );
};

export default smallNavbar;
