import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Row, Col, Empty, Divider } from "antd";
import { HiOutlineCake } from "react-icons/hi";
import { GET_USER } from "../../graphql/query";
import { useAuth } from "../../layouts/layoutAuth";
import moment from "moment";
import GlobalHeader from "../../components/Layouts/globalHeader";
import ProfileNavbar from "../../components/Layouts/profileNavbar";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const [show, setShow] = useState("all");
  //===========get data form graphql===============
  const { loading, data, refetch } = useQuery(GET_USER);
  if (loading) return "";

  return (
    <React.Fragment>
      <div className="brand-bg"></div>
      <div className="container">
        {isAuthenticated && (
          <div className="container-layout-profile">
            <div className="layout-profile">
              <center>
                <img className="profile-img1" src={user && user.user.get_user.image} />
                <h2 className="name-pf">{user && user.user.get_user.fullname}</h2>
                <div className="date-pf-join">
                  <Row>
                    <Col style={{ paddingTop: "4px" }} span={3}>
                      <HiOutlineCake style={{ fontSize: "19px" }} />
                    </Col>
                    <Col style={{ paddingTop: "4px" }} span={21}>
                      <h3>
                        Joined On :{" "}
                        {moment
                          .unix(user && user.user.get_user.createdAt / 1000)
                          .format("LL")}
                      </h3>
                    </Col>
                  </Row>
                </div>
                <h4 style={{ marginTop: "12px" }}>{user && user.user.get_user.bio}</h4>
              </center>
              <br></br>
            </div>
            <div>
              <ProfileNavbar />
            </div>
          </div>
        )}
        {!isAuthenticated && window.location.replace("/")}
      </div>
      <br></br>
    </React.Fragment>
  );
};

export default Profile;
