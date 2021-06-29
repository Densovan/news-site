import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Row, Col } from "antd";
import { HiOutlineCake } from "react-icons/hi";
import { GET_USER } from "../../graphql/query";
import AuthContext from "../../contexts/authContext";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import moment from "moment";
import {
  HiOutlineClipboardCheck,
  HiOutlineUserAdd,
  HiOutlineUserGroup,
} from "react-icons/hi";

const Profile = () => {
  const { loggedIn } = useContext(AuthContext);
  //===========get data form graphql===============
  const { loading, data, refetch } = useQuery(GET_USER);
  if (loading) return "";
  return (
    <React.Fragment>
      <MainNavbar />
      <div className="brand-bg"></div>
      <div className="container">
        {loggedIn === true && (
          <div className="container-layout-profile">
            <div className="layout-profile">
              <center>
                <img className="profile-img1" src={data.get_user.image} />
                <h2>{data.get_user.fullname}</h2>
                <h3 className="date-news">
                  {/* <HiOutlineCake size={18} /> */}
                  Joined On :{" "}
                  {moment.unix(data.get_user.createdAt / 1000).format("LL")}
                </h3>
                <h4 style={{ marginTop: "12px" }}>{data.get_user.bio}</h4>
              </center>
              <br></br>

              {/* <div className="sub-layout-profile">
                <Row gutter={[12, 12]}>
                  <Col sm={6}>
                    <div className="box-total-profile">
                      <h3>Total posts</h3>
                      <div>
                        <h4>0</h4>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="box-total-profile">
                      <h3>Total views posts</h3>
                      <div>
                        <h4>0</h4>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="box-total-profile">
                      <h3>Following Users</h3>
                      <div>
                        <h4>{data.get_user.following.length}</h4>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="box-total-profile">
                      <h3>Follower Users</h3>
                      <div>
                        <h4>{data.get_user.follower.length}</h4>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div> */}
            </div>
            <br></br>
            <div>
              <Row gutter={[12, 12]}>
                <Col span={8}>
                  <div className="box-pf">
                    <Row className="accountNavbarhover">
                      <Col style={{ paddingTop: "4px" }} span={2}>
                        <HiOutlineClipboardCheck style={{ fontSize: "21px" }} />
                      </Col>
                      <Col style={{ paddingTop: "4px" }} span={22}>
                        {data.get_user.news.length}
                        posts published
                      </Col>
                    </Row>
                    <Row className="accountNavbarhover">
                      <Col style={{ paddingTop: "4px" }} span={2}>
                        <HiOutlineUserAdd style={{ fontSize: "21px" }} />
                      </Col>
                      <Col style={{ paddingTop: "4px" }} span={22}>
                        {data.get_user.following.length} following
                      </Col>
                    </Row>
                    <Row className="accountNavbarhover">
                      <Col style={{ paddingTop: "4px" }} span={2}>
                        <HiOutlineUserGroup style={{ fontSize: "21px" }} />
                      </Col>
                      <Col style={{ paddingTop: "4px" }} span={22}>
                        {data.get_user.follower.length} follower
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col span={16}>hello</Col>
              </Row>
            </div>
          </div>
        )}
        {loggedIn === false && window.location.replace("/")}
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
