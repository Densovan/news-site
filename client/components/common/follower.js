import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { FOLLOW, UNFOLLOW } from "../../graphql/mutation";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Follower = ({ articleUser }) => {
  const router = useRouter();
  const [state, setState] = useState(false);
  const [followId, setFollowId] = useState(null);
  const { loading, data: user } = useQuery(GET_USER);

  const [addFollow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (user.get_user !== null) {
      if (following.length === 0) {
        setState(false);
      } else {
        following.map((following) => {
          if (following.followingId === articleUser.id) {
            setState(true);
            setFollowId(following.followingId);
          }
        });
      }
    }
  }, [user]);

  if (loading) return "";

  const handleFollow = (e) => {
    e.preventDefault();
    addFollow({
      variables: {
        id: articleUser.id,
        fullname: articleUser.fullname,
        email: articleUser.email,
        image: articleUser.image,
      },
    }).then(async (data) => {
      setState(true);
    });
  };

  const handleUnFollow = (e, followingId) => {
    e.preventDefault();
    unfollow({ variables: { id: followingId } }).then(async (data) => {
      setState(false);
    });
  };
  const following = [];
  const follow = [];

  if (user.get_user !== null) {
    user.get_user.following.forEach((object) => {
      following.push(object);
    });
  }
  if (state === true) {
    follow.push(
      <div key="1">
        <button
          className="btn-unfollow"
          onClick={(e) => handleUnFollow(e, followId)}
        >
          Following
        </button>
      </div>
    );
  }
  if (state === false) {
    if (user.get_user === null) {
      follow.push(
        <div key="1">
          <button
            className="btn-follow"
            onClick={(e) => {
              e.preventDefault();
              router.push("/signin");
            }}
          >
            Follow
          </button>
        </div>
      );
    } else {
      follow.push(
        <div key="1">
          <button className="btn-follow" type="primary" onClick={handleFollow}>
            Follow
          </button>
        </div>
      );
    }
  }

  return <div>{follow}</div>;
};

export default Follower;
