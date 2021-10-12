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
import ProfileNavbar from "../../components/Layouts/profileNavbar";

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
        {loggedIn && (
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
            <div>
              <ProfileNavbar />
            </div>
          </div>
        )}
        {!loggedIn && window.location.replace("/")}
      </div>
      <br></br>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Profile;
