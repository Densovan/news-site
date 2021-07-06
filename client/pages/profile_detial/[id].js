import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { GET_USER_BY_ID, GET_USER } from "../../graphql/query";
import { useQuery, useMutation } from "@apollo/client";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import moment from "moment";
import ContentLoader from "react-content-loader";
import Follower from "../../components/common/follower";
import AuthContext from "../../contexts/authContext";
import { Row, Col } from "antd";
import Link from "next/link";
import {
  HiOutlineClipboardCheck,
  HiOutlineUserAdd,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { CaretRightOutlined } from "@ant-design/icons";
import Output from "editorjs-react-renderer";

const Profile_detail = () => {
  const { loggedIn } = useContext(AuthContext);
  const [show, setShow] = useState("all");
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  const {
    loading: currentLaoding,
    data: currentData,
    refetch: currentRefetch,
  } = useQuery(GET_USER);
  if (loading || currentLaoding)
    return (
      <center style={{ marginTop: "100px" }}>
        <ContentLoader
          width={900}
          height={560}
          viewBox="0 0 400 160"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="80" y="73" rx="3" ry="3" width="254" height="6" />
          <rect x="78" y="88" rx="3" ry="3" width="254" height="6" />
          <rect x="150" y="103" rx="3" ry="3" width="118" height="6" />
          <circle cx="210" cy="27" r="22" />
          <circle cx="181" cy="151" r="6" />
          <circle cx="211" cy="151" r="6" />
          <circle cx="241" cy="151" r="6" />
          <rect x="37" y="54" rx="32" ry="32" width="15" height="15" />
          <rect x="37" y="46" rx="0" ry="0" width="4" height="18" />
          <rect x="54" y="54" rx="32" ry="32" width="15" height="15" />
          <rect x="54" y="46" rx="0" ry="0" width="4" height="19" />
          <rect x="336" y="118" rx="32" ry="32" width="15" height="15" />
          <rect x="357" y="118" rx="32" ry="32" width="15" height="15" />
          <rect x="347" y="123" rx="0" ry="0" width="4" height="18" />
          <rect x="368" y="123" rx="0" ry="0" width="4" height="18" />
        </ContentLoader>
      </center>
    );
  console.log(data);
  return (
    <React.Fragment>
      <MainNavbar />
      {loggedIn === true && (
        <div>
          {data.get_user_by_id.id === currentData.get_user.id &&
            window.location.replace("/dashboard/profile")}
        </div>
      )}
      <div className="brand-bg"></div>
      <div className="container">
        <div className="container-layout-profile">
          <div className="layout-profile">
            <div className="place-follow-btn">
              {" "}
              <Follower articleUser={data.get_user_by_id} />
            </div>
            <center>
              <img className="profile-img1" src={data.get_user_by_id.image} />
              <h2>{data.get_user_by_id.fullname}</h2>
              <h3 className="date-news">
                Joined On :{" "}
                {moment.unix(data.get_user_by_id.createdAt / 1000).format("LL")}
              </h3>
              <h4 style={{ marginTop: "12px" }}>{data.get_user_by_id.bio}</h4>
            </center>
            <br></br>
          </div>
          <br></br>
          <div>
            <Row gutter={[12, 12]}>
              <Col span={8}>
                <div className="box-pf">
                  <Row
                    className="list-content-pf"
                    className={
                      show === "" ? "active-list-pf" : "a-list-content-pf"
                    }
                  >
                    <Col style={{ paddingTop: "4px" }} span={3}>
                      <HiOutlineClipboardCheck style={{ fontSize: "21px" }} />
                    </Col>
                    <Col style={{ paddingTop: "4px" }} span={21}>
                      {data.get_user_by_id.news.length} {""}
                      posts published
                    </Col>
                  </Row>

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
                      {data.get_user_by_id.following.length} following
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
                      {data.get_user_by_id.follower.length} follower
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={16}>
                {/* <br></br>
                <center>
                  <h1>Coming soon</h1>
                </center> */}
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Profile_detail;
