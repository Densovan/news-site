import React from "react";
import { Row, Col } from "antd";
import Link from "next/link";

const follower = ({ userFollow }) => {
  return (
    <React.Fragment>
      <div>
        <Row gutter={[12, 12]}>
          {userFollow.map((res) => {
            return (
              <Col sm={24} md={8}>
                <Link
                  href={`/profile_detial/${res.followerId}#${res.fullname
                    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, "-")
                    .toLowerCase()}`}
                >
                  <div className="user-follow-card">
                    <div className="sub-user-follow-card">
                      <center>
                        <img className="avatar-follow" src={res.image}></img>
                        <h4>{res.fullname}</h4>
                      </center>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default follower;
