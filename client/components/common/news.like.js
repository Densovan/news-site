import React, { Fragment, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_COUNT_UP, LIKE_COUNT_DOWN } from "../../graphql/mutation";
import { GET_LIKE_COUNT_DOWN } from "../../graphql/query";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";

const NewsLike = ({ postId, ownerId, likeCount, like_count_down }) => {
  const [state, setState] = useState({
    like: false,
    unlike: false,
  });
  useEffect(() => {
    like_count_down.get_count_up_down.map((like_count_down) => {
      if (like_count_down.postId == postId && like_count_down.type == "up") {
        setState({ like: true });
      }
      if (like_count_down.postId == postId && like_count_down.type == "down") {
        setState({ unlike: true });
      }
    });
  }, [postId, like_count_down, likeCount]);
  const [LikeCountUp] = useMutation(LIKE_COUNT_UP);
  const [LikeCountDown] = useMutation(LIKE_COUNT_DOWN);
  const handleLike = async () => {
    try {
      if (state.like === false) {
        setState({
          like: true,
          unlike: false,
        });
        if (state.unlike == true) {
          await LikeCountDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
            },
          }).then(async (response) => {
            console.log(response);
          });
        }
      } else {
        setState({
          like: false,
          unlike: false,
        });
      }
      await LikeCountUp({
        variables: {
          postId: postId,
          ownerId: ownerId,
        },
      }).then(async (response) => {
        console.log(response);
      });
    } catch (e) {
      console.log("error!!");
    }
  };
  const handleDislike = async () => {
    try {
      if (state.unlike === false) {
        setState({
          like: false,
          unlike: true,
        });
        if (state.like == true) {
          await LikeCountUp({
            variables: {
              postId: postId,
              ownerId: ownerId,
            },
          }).then(async (response) => {
            console.log(response);
          });
        }
      } else {
        setState({
          unlike: false,
          like: false,
        });
      }
      await LikeCountDown({
        variables: {
          postId: postId,
          ownerId: ownerId,
        },
      }).then(async (response) => {
        console.log(response);
      });
    } catch (e) {
      console.log("error!!");
    }
  };
  return (
    <Fragment>
      <div>
        <button className="btn-news">{likeCount}</button>
        <button className="btn-news" onClick={handleLike}>
          {state.like ? (
            <LikeFilled style={{ fontSize: "18px" }} />
          ) : (
            <LikeOutlined style={{ fontSize: "18px" }} />
          )}
        </button>
        <button className="btn-news" onClick={handleDislike}>
          {state.unlike ? (
            <DislikeFilled style={{ fontSize: "18px" }} />
          ) : (
            <DislikeOutlined style={{ fontSize: "18px" }} />
          )}
        </button>
      </div>
    </Fragment>
  );
};

export default NewsLike;
