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
  // const [showFollow, setShowfoller] = useState(id);
  const [follow_user] = useMutation(FOLLOW);
  const [unfollow_user] = useMutation(UNFOLLOW);
  // const [followed, setFollowed] = useState(
  //   data1.get_user.following.includes(data1?.followingId)
  // );

  // console.log(data1);
  if (loading || loading1)
    return (
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
      </center>
    );
  const showfollow = data1 ? !data1.get_user.following.includes(id) : true;

  console.log("followed", showfollow);

  // const unfollow = () => {
  //   setUnfollow(
  //     unfollow_user({
  //       variables: { id: data.get_user_by_id.id },
  //     })
  //   );
  //   refetch();
  //   refetch1();
  // };
  // const follow = () => {
  //   setFollow(
  //     follow_user({
  //       variables: {
  //         id: data.get_user_by_id.id,
  //         // followingId: data.get_user_by_id.id,
  //         // followerId: data1.get_user.id,
  //         fullname: data.get_user_by_id.fullname,
  //         email: data.get_user_by_id.email,
  //         image: data.get_user_by_id.image,
  //       },
  //     })
  //   );
  //   refetch();
  //   refetch1();
  // };

  return (
    <React.Fragment>
      <MainNavbar />
      <div className="brand-bg"></div>
      <div className="container">
        <div className="container-layout-profile">
          <div className="layout-profile">
            <div className="place-follow-btn">
              {/* {data.get_user_by_id.follower.length === 0 ? (
                <div>follow</div>
              ) : (
                <div>
                  {data.get_user_by_id.follower.map((res) => {
                    return (
                      <div>
                        {res.followerId === data1.get_user.id ? (
                          <div>following</div>
                        ) : (
                          <Button onClick={follow} type="primary">
                            follow
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )} */}
              {/* <div>
                {data.get_user_by_id.follower.map((res) => {
                  return (
                    <div>
                      {res.followerId === data1.get_user.id ? (
                        <div>following</div>
                      ) : (
                        <Button onClick={follow} type="primary">
                          follow
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div> */}
            </div>
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
