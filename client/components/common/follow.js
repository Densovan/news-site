import { useQuery, useMutation } from "@apollo/client";
import { GET_FOLLOWS } from "../../graphql/query";
import { FOLLOW } from "../../graphql/mutation";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { notification } from "antd";

const Follow = ({ articleUser, user, follows }) => {
  const [state, setState] = useState({
    loading: false,
    follow: false,
  });
  const [follow] = useMutation(FOLLOW);
  useEffect(() => {
    follows.get_follows.map((follow) => {
      if (
        follow.followTo == articleUser.id &&
        user.get_user.accountId == follow.followBy
      ) {
        setState({
          follow: true,
        });
      }
    });
  }, [follows]);
  const handleFollow = async () => {
    try {
      if (state.follow == false) {
        setState({
          loading: true,
          follow: true,
        });
        follow({
          variables: {
            followTo: articleUser.id,
          },
        }).then((response) => {
          notification.open({
            closeIcon: true,
            message: response.data.follow.message,
            description: "You have follow to " + articleUser.fullname,
            placement: "bottomLeft",
          });
          setTimeout(() => {
            setState({
              loading: false,
              follow: true,
            });
          }, 1000);
        });
      } else {
        setState({
          loading: true,
          follow: false,
        });
        follow({
          variables: {
            followTo: articleUser.id,
          },
        }).then((response) => {
          notification.open({
            closeIcon: true,
            message: response.data.follow.message,
            description: "You have unfollow to " + articleUser.fullname,
            placement: "bottomLeft",
          });
          setTimeout(() => {
            setState({
              loading: false,
              follow: false,
            });
          }, 1000);
        });
      }
    } catch (e) {
      console.log("errors");
    }
  };
  return (
    <div key="1">
      <button
        className={
          state.loading
            ? "disabled btn-follow"
            : state.follow
            ? "btn-unfollow"
            : "btn-follow"
        }
        onClick={handleFollow}
      >
        {state.loading
          ? state.follow
            ? "Follow..."
            : "Following..."
          : state.follow
          ? "Following"
          : "Follow"}
      </button>
      {/* <button
        className={state.loading ? "disabled btn-follow" : "btn-follow"}
        onClick={handleFollow}
      >
        {state.loading
          ? state.follow
            ? "Follow..."
            : "Following..."
          : state.follow
          ? "Following"
          : "Follow"}
      </button> */}
    </div>
  );
};

export default Follow;
