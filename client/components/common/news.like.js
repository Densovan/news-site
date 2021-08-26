import React, { Fragment, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { VOTE_UP_DOWN, CHECK_TOP_NEWS } from "../../graphql/mutation";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";

const NewsLike = ({ postId, ownerId, voteCount, vote_up_down, get_all_vote }) => {
  const [state, setState] = useState({
    like: false,
    unlike: false,
  });
  const [vote, setVote] = useState({
    count: 0
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
        setState({ like: false, unlike: true });
      }
    })
  }, [postId, vote_up_down]);

  useEffect(() => {
    let sum = 0; 
    for (let i=0; i < get_all_vote.get_all_vote_up_down.length; i++) { 
      if (get_all_vote.get_all_vote_up_down[i].postId == postId) {
        sum += get_all_vote.get_all_vote_up_down[i].count
      }
      setVote({
        count: sum,
      })
    }
  }, [postId, get_all_vote])

  const [voteUpDown] = useMutation(VOTE_UP_DOWN);
  const [checkTopNews] = useMutation(CHECK_TOP_NEWS);
  const handleLike = async () => {
    try {
      if (state.like === false) {
        // setState({
        //   like: true,
        //   unlike: false,
        // });
        if (state.unlike === true) {
          setState({
            like: true,
            unlike: false,
          });
          console.log("+2");
          await voteUpDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
              type: "up",
              count: 1
            },
          }).then(async (response) => {
            console.log(response);
          });
        }else{
          setState({
            like: true,
            unlike: false,
          });
          console.log("+1");
          await voteUpDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
              type: "up",
              count: 1
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
        console.log("-1");
        await voteUpDown({
          variables: {
            postId: postId,
            ownerId: ownerId,
            type: "up",
            count: 0
          },
        }).then(async (response) => {
          console.log(response);
        });
      }
      await checkTopNews({
        variables: {
          postId: postId,
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
        // setState({
        //   like: false,
        //   unlike: true,
        // });
        if (state.like === true) {
          setState({
            like: false,
            unlike: true,
          });
          console.log("-2");
          await voteUpDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
              type: "down",
              count: -1
            },
          }).then(async (response) => {
            console.log(response);
          });
        }else{
          setState({
            like: false,
            unlike: true,
          });
          console.log("-1");
          await voteUpDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
              type: "down",
              count: -1
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
        console.log("+1");
        await voteUpDown({
          variables: {
            postId: postId,
            ownerId: ownerId,
            type: "down",
            count: 0
          },
        }).then(async (response) => {
          console.log(response);
        });
      }
      await checkTopNews({
        variables: {
          postId: postId
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
        <label className="btn-news">{voteCount > 0 ? voteCount : "0"}</label>
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
