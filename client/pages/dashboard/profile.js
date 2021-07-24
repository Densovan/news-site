import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Row, Col, Empty, Divider } from "antd";
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
import GlobalHeader from "../../components/Layouts/globalHeader";

const Profile = () => {
  const { loggedIn } = useContext(AuthContext);
  const [show, setShow] = useState("all");
  //===========get data form graphql===============
  const { loading, data, refetch } = useQuery(GET_USER);
  if (loading) return "";

  return (
    <React.Fragment>
      {/* <MainNavbar /> */}
      <GlobalHeader />

      <div className="brand-bg"></div>
      <div className="container">
        {loggedIn === true && (
          <div className="container-layout-profile">
            <div className="layout-profile">
              <center>
                <img className="profile-img1" src={data.get_user.image} />
                <h2 className="name-pf">{data.get_user.fullname}</h2>
                <div className="date-pf-join">
                  <Row>
                    <Col style={{ paddingTop: "4px" }} span={3}>
                      <HiOutlineCake style={{ fontSize: "19px" }} />
                    </Col>
                    <Col style={{ paddingTop: "4px" }} span={21}>
                      <h3>
                        Joined On :{" "}
                        {moment
                          .unix(data.get_user.createdAt / 1000)
                          .format("LL")}
                      </h3>
                    </Col>
                  </Row>
                </div>
                <h4 style={{ marginTop: "12px" }}>{data.get_user.bio}</h4>
              </center>
              <br></br>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* <div>
              <Row gutter={[12, 12]}>
                <Col span={8}>
                  <div className="box-pf">
                    <Link href="/dashboard/allstories">
                      <Row
                        className="list-content-pf"
                        className={
                          show === "" ? "active-list-pf" : "a-list-content-pf"
                        }
                      >
                        <Col style={{ paddingTop: "4px" }} span={3}>
                          <HiOutlineClipboardCheck
                            style={{ fontSize: "21px" }}
                          />
                        </Col>
                        <Col style={{ paddingTop: "4px" }} span={21}>
                          {data.get_user.news.length} {""}
                          posts published
                        </Col>
                      </Row>
                    </Link>
                    <Row
                      onClick={() => setShow("following")}
                      // className="accountNavbarhover"
                      className="list-content-pf"
                      className={
                        show === "following"
                          ? "active-list-pf"
                          : "a-list-content-pf"
                      }
                    >
                      <Col style={{ paddingTop: "4px" }} span={3}>
                        <HiOutlineUserAdd style={{ fontSize: "21px" }} />
                      </Col>
                      <Col style={{ paddingTop: "4px" }} span={21}>
                        {data.get_user.following.length} following
                      </Col>
                    </Row>
                    <Row
                      onClick={() => setShow("follower")}
                      // className="accountNavbarhover"
                      className="list-content-pf"
                      className={
                        show === "follower"
                          ? "active-list-pf"
                          : "a-list-content-pf"
                      }
                    >
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
                  {show === "all" && (
                    <div className="box-pf">
                      <div>
                        <h3>
                          <Divider orientation="left">Recent Follower</Divider>
                        </h3>
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
                        <h3>
                          <Divider orientation="left">Recent Following</Divider>
                        </h3>
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
                  )}
                </Col>
              </Row>
            </div> */}
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
