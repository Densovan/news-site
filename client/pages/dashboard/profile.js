import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Row, Col } from "antd";
import { HiOutlineCake } from "react-icons/hi";
import { GET_USER } from "../../graphql/query";
import AuthContext from "../../contexts/authContext";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import moment from "moment";

const Profile = () => {
  const { loggedIn } = useContext(AuthContext);
  //===========get data form graphql===============
  const { loading, data, refetch } = useQuery(GET_USER);
  if (loading) return "";
  console.log(data);
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
              </center>
              <br></br>
              <div className="sub-layout-profile">
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
              </div>
              <br></br>
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
