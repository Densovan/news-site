import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWS_BY_USER } from "../../graphql/query";
import Footer from "../../components/Layouts/footer";
import AuthContext from "../../contexts/authContext";
import Profile from "./profile";
import Link from "next/link";
import { Row, Col } from "antd";

const following = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;
  const { loggedIn } = useContext(AuthContext);

  const { loading, data, fetchMore } = useQuery(GET_FOLLOWS_BY_USER, {
    variables: { limit: 6, offset: 0 },
    pollInterval: 500,
  });
  if (loading) return "loading...";
  // console.log(data.get_follows_by_user);
  const { user } = data.get_follows_by_user;
  console.log(user);
  return (
    <React.Fragment>
      <Profile />
      {loggedIn && (
        <div className="container">
          <div className="profile-content">
            <div className="sub-pf-content">
              <h2>Followers</h2>
              <Row gutter={[12, 12]}>
                {user.get_follower.map((res) => {
                  return (
                    <Col xs={12} md={6}>
                      <Link
                        style={{ cursor: "pointer" }}
                        href={`/profile_detial/${res.userFollower.id}`}
                      >
                        <div className="box-pf">
                          <center>
                            <img
                              className="img-following"
                              src={res.userFollower.image}
                            />
                            <p>{res.userFollower.fullname}</p>
                          </center>
                        </div>
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      )}
      <br></br>
      {!loggedIn && window.location.replace("/")}
      <Footer />
    </React.Fragment>
  );
};

export default following;
