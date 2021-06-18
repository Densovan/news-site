import React, { useState } from "react";
import { useRouter } from "next/router";
import { GET_USER_BY_ID, GET_USER } from "../../graphql/query";
import { FOLLOW, UNFOLLOW } from "../../graphql/mutation";
import { CubeSpinner } from "react-spinners-kit";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "antd";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import moment from "moment";

const Profile_detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [unfollows, setUnfollow] = useState();
  const [follows, setFollow] = useState();
  const { loading, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  const {
    loading: loading1,
    data: data1,
    refetch: refetch1,
  } = useQuery(GET_USER);
  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);
  if (loading || loading1)
    return (
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
      </center>
    );
  // console.log("data1", data1.get_user.fullname);
  const unfollow_user = () => {
    setUnfollow(
      unfollow({
        variables: { id: data.get_user_by_id.id },
      })
    );
    refetch();
    refetch1();
  };
  const follow_user = () => {
    setFollow(
      follow({
        variables: { followTo: data.get_user_by_id.id },
      })
    );
    refetch();
    refetch1();
  };
  return (
    <React.Fragment>
      <MainNavbar />
      <div className="brand-bg"></div>
      <div className="container">
        <div className="container-layout-profile">
          <div className="layout-profile">
            {/* <div className="place-follow-btn">
              {data.get_user_by_id.following.map((res) => {
                return (
                  <div>
                    {res.followBy === data1.get_user.id && (
                      <div>
                        {res.follow === false && (
                          <button onClick={follow_user} className="follow-btn">
                            Follow
                          </button>
                        )}
                        {res.follow === true && (
                          <button
                            onClick={unfollow_user}
                            className="follow-btn"
                          >
                            Following
                          </button>
                        )}
                      </div>
                    )}
                    {data.get_user_by_id.id !== data1.get_user.id && (
                      <button onClick={follow_user} className="follow-btn">
                        Follow
                      </button>
                    )}
                  </div>
                );
              })}
            
              {data.get_user_by_id.id === data1.get_user.id &&
                window.location.replace("/dashboard/profile")}
            </div> */}
            <center>
              <img className="profile-img1" src={data.get_user_by_id.image} />
              <h2>{data.get_user_by_id.fullname}</h2>
              <h3 className="date-news">
                {/* <HiOutlineCake size={18} /> */}
                Joined On :{" "}
                {moment.unix(data.get_user_by_id.createdAt / 1000).format("LL")}
              </h3>
            </center>

            <br></br>
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Profile_detail;
