import React, { Fragment, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { VOTE_UP_DOWN } from "../../graphql/mutation";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";

const NewsLike = ({ postId, ownerId, voteCount, vote_up_down }) => {
  const [state, setState] = useState({
    like: false,
    unlike: false,
  });
  const [counter, setCounter] = useState({
    count: voteCount,
  });
  useEffect(() => {
    vote_up_down.get_vote_up_down.map((get_vote_up_down) => {
      if (get_vote_up_down.postId == postId && get_vote_up_down.type == "up") {
        setState({ like: true, unlike: false });
      }
      if (
        get_vote_up_down.postId == postId &&
        get_vote_up_down.type == "down"
      ) {
        setState({ unlike: true, like: false });
      }
    });
  }, [postId, vote_up_down]);
  const [voteUpDown] = useMutation(VOTE_UP_DOWN);
  const handleLike = async () => {
    try {
      if (state.like === false) {
        setState({
          like: true,
          unlike: false,
        });
        if (state.unlike == true) {
          if (voteCount > 1) {
            setCounter({
              count: counter.count + 2,
            });
          } else {
            setCounter({
              count: counter.count + 1,
            });
          }
        } else {
          setCounter({
            count: counter.count + 1,
          });
        }
      } else {
        setState({
          like: false,
          unlike: false,
        });
        if (state.like == true) {
          setCounter({
            count: counter.count - 1,
          });
        } else {
          setCounter({
            count: counter.count - 1,
          });
        }
      }
      await voteUpDown({
        variables: {
          postId: postId,
          ownerId: ownerId,
          type: "up",
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
          console.log("do");
          if (voteCount > 1) {
            setCounter({
              count: counter.count - 2,
            });
          } else {
            setCounter({
              count: counter.count - 1,
            });
          }
        } else {
          if (voteCount > 0) {
            setCounter({
              count: counter.count - 1,
            });
          } else {
            setCounter({
              count: counter.count,
            });
          }
        }
      } else {
        setState({
          unlike: false,
          like: false,
        });
        if (state.unlike == true) {
          if (voteCount > 0) {
            setCounter({
              count: counter.count + 1,
            });
          } else {
            setCounter({
              count: counter.count,
            });
          }
        } else {
          setCounter({
            count: counter.count + 1,
          });
        }
      }
      await voteUpDown({
        variables: {
          postId: postId,
          ownerId: ownerId,
          type: "down",
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
        <label className="btn-news">{counter.count}</label>
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
