import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Row, Col, Empty } from "antd";
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
import Link from "next/link";

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
            </div>
            <br></br>
            <div>
              <Row gutter={[12, 12]}>
                <Col span={8}>
                  <div className="box-pf">
                    <Row className="accountNavbarhover">
                      <Col style={{ paddingTop: "4px" }} span={3}>
                        <HiOutlineClipboardCheck style={{ fontSize: "21px" }} />
                      </Col>
                      <Col style={{ paddingTop: "4px" }} span={21}>
                        {data.get_user.news.length} {""}
                        posts published
                      </Col>
                    </Row>
                    <Row className="accountNavbarhover">
                      <Col style={{ paddingTop: "4px" }} span={3}>
                        <HiOutlineUserAdd style={{ fontSize: "21px" }} />
                      </Col>
                      <Col style={{ paddingTop: "4px" }} span={21}>
                        {data.get_user.following.length} following
                      </Col>
                    </Row>
                    <Row className="accountNavbarhover">
                      <Col style={{ paddingTop: "4px" }} span={3}>
                        <HiOutlineUserGroup style={{ fontSize: "21px" }} />
                      </Col>
                      <Col style={{ paddingTop: "4px" }} span={21}>
                        {data.get_user.follower.length} follower
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col span={16}>
                  <div className="box-pf">
                    <div>
                      <h2>Recent Follower</h2>
                      {data.get_user.follower.length === 0 && <Empty />}
                      <Row gutter={[12, 12]}>
                        {data.get_user.follower.slice(0, 6).map((res) => (
                          <Col span={4}>
                            <Link href={`/profile_detial/${res.followerId}`}>
                              <center>
                                <img
                                  className="img-following"
                                  src={res.image}
                                />
                                <p>{res.fullname}</p>
                              </center>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </div>
                    <div>
                      <h2>Recent Following</h2>
                      {data.get_user.following.length === 0 && <Empty />}
                      <Row gutter={[12, 12]}>
                        {data.get_user.following.slice(0, 6).map((res) => (
                          <Col span={4}>
                            <Link href={`/profile_detial/${res.followingId}`}>
                              <center>
                                <img
                                  className="img-following"
                                  src={res.image}
                                />
                                <p>{res.fullname}</p>
                              </center>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
        {loggedIn === false && window.location.replace("/")}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
