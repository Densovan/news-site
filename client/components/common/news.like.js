// import React, { Fragment, useState, useEffect, useContext } from "react";
// import { useMutation } from "@apollo/client";
// import { VOTE_UP_DOWN, CHECK_TOP_NEWS } from "../../graphql/mutation";
// import { notification } from "antd";
// import {
//   LikeOutlined,
//   DislikeOutlined,
//   LikeFilled,
//   DislikeFilled,
// } from "@ant-design/icons";
// import { useRouter } from "next/router";
// import AuthContext from "../../contexts/authContext";
// const NewsLike = ({
//   postId,
//   ownerId,
//   voteCount,
//   title,
//   vote_up_down,
//   get_all_vote,
// }) => {
//   const [state, setState] = useState({
//     like: false,
//     unlike: false,
//   });
//   const [vote, setVote] = useState({
//     count: 0,
//   });
//   const { loggedIn } = useContext(AuthContext);
//   // const { loggedIn } = true;
//   const router = useRouter();
//   useEffect(() => {
//     vote_up_down.get_vote_up_down.map((get_vote_up_down) => {
//       if (get_vote_up_down.postId == postId && get_vote_up_down.type == "up") {
//         setState({ like: true, unlike: false });
//       }
//       if (
//         get_vote_up_down.postId == postId &&
//         get_vote_up_down.type == "down"
//       ) {
//         setState({ like: false, unlike: true });
//       }
//     });
//   }, [postId, vote_up_down, vote]);

//   useEffect(() => {
//     let sum = 0;
//     for (let i = 0; i < get_all_vote.get_all_vote_up_down.length; i++) {
//       if (get_all_vote.get_all_vote_up_down[i].postId == postId) {
//         sum += get_all_vote.get_all_vote_up_down[i].count;
//       }
//     }
//     setVote({
//       count: sum,
//     });
//   }, [postId, get_all_vote]);

//   const [voteUpDown] = useMutation(VOTE_UP_DOWN);
//   const [checkTopNews] = useMutation(CHECK_TOP_NEWS);
//   const redirectLogin = async () => {
//     const signin = "http://localhost:3008/signin";
//     const newwindow = router.push(signin);
//   };
//   const handleLike = async () => {
//     try {
//       if (state.like === false) {
//         if (state.unlike === true) {
//           setState({
//             like: true,
//             unlike: false,
//           });
//           await voteUpDown({
//             variables: {
//               postId: postId,
//               ownerId: ownerId,
//               type: "up",
//               count: 1,
//             },
//           }).then(async (response) => {
//             notification.open({
//               closeIcon: true,
//               message: "Added to Liked news",
//               description: title,
//               placement: "bottomLeft",
//             });
//           });
//         } else {
//           setState({
//             like: true,
//             unlike: false,
//           });
//           await voteUpDown({
//             variables: {
//               postId: postId,
//               ownerId: ownerId,
//               type: "up",
//               count: 1,
//             },
//           }).then(async (response) => {
//             notification.open({
//               closeIcon: true,
//               message: "Added to Liked news",
//               description: title,
//               placement: "bottomLeft",
//             });
//           });
//         }
//       } else {
//         setState({
//           like: false,
//           unlike: false,
//         });
//         await voteUpDown({
//           variables: {
//             postId: postId,
//             ownerId: ownerId,
//             type: "up",
//             count: 0,
//           },
//         }).then(async (response) => {
//           notification.open({
//             closeIcon: true,
//             message: "Removed from Liked news",
//             description: title,
//             placement: "bottomLeft",
//           });
//         });
//       }
//       await checkTopNews({
//         variables: {
//           postId: postId,
//         },
//       });
//     } catch (e) {
//       console.log("error!!");
//     }
//   };
//   const handleDislike = async () => {
//     try {
//       if (state.unlike === false) {
//         if (state.like === true) {
//           setState({
//             like: false,
//             unlike: true,
//           });
//           await voteUpDown({
//             variables: {
//               postId: postId,
//               ownerId: ownerId,
//               type: "down",
//               count: -1,
//             },
//           }).then(async (response) => {
//             notification.open({
//               closeIcon: true,
//               message: "You dislike this news",
//               description: title,
//               placement: "bottomLeft",
//             });
//           });
//         } else {
//           setState({
//             like: false,
//             unlike: true,
//           });
//           await voteUpDown({
//             variables: {
//               postId: postId,
//               ownerId: ownerId,
//               type: "down",
//               count: -1,
//             },
//           }).then(async (response) => {
//             notification.open({
//               closeIcon: true,
//               message: "You dislike this news",
//               description: title,
//               placement: "bottomLeft",
//             });
//           });
//         }
//       } else {
//         setState({
//           unlike: false,
//           like: false,
//         });
//         await voteUpDown({
//           variables: {
//             postId: postId,
//             ownerId: ownerId,
//             type: "down",
//             count: 0,
//           },
//         }).then(async (response) => {
//           notification.open({
//             closeIcon: true,
//             message: "Dislike removed",
//             description: title,
//             placement: "bottomLeft",
//           });
//         });
//       }
//       await checkTopNews({
//         variables: {
//           postId: postId,
//         },
//       });
//     } catch (e) {
//       console.log("error!!");
//     }
//   };
//   const handleTest = () => {
//     notification.open({
//       closeIcon: true,
//       message: "You dislike this news",
//       placement: "bottomLeft",
//     });
//   };
//   return (
//     <Fragment>
//       <div>
//         <label className="btn-news">{vote.count > 0 ? vote.count : "0"}</label>
//         <button className="btn-news" onClick={handleLike}>
//           {state.like ? (
//             <LikeFilled style={{ fontSize: "18px" }} />
//           ) : (
//             <LikeOutlined style={{ fontSize: "18px" }} />
//           )}
//         </button>
//         <button
//           className="btn-news"
//           onClick={loggedIn === true ? handleDislike : redirectLogin}
//         >
//           {state.unlike ? (
//             <DislikeFilled style={{ fontSize: "18px" }} />
//           ) : (
//             <DislikeOutlined style={{ fontSize: "18px" }} />
//           )}
//         </button>
//       </div>
//     </Fragment>
//   );
// };

// export default NewsLike;

import React, { Fragment, useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { VOTE_UP_DOWN, CHECK_TOP_NEWS } from "../../graphql/mutation";
import { notification } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import { useRouter } from "next/router";
// import AuthContext from "../../contexts/salaKoompiAuth";
import AuthContext from "../../contexts/authContext";
const NewsLike = ({
  postId,
  ownerId,
  voteCount,
  title,
  vote_up_down,
  get_all_vote,
}) => {
  const [state, setState] = useState({
    like: false,
    unlike: false,
  });
  const [vote, setVote] = useState({
    count: 0,
  });
  const { loggedIn } = useContext(AuthContext);
  // const { loggedIn } = true;
  const router = useRouter();
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
    });
  }, [postId, vote_up_down]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < get_all_vote.get_all_vote_up_down.length; i++) {
      if (get_all_vote.get_all_vote_up_down[i].postId == postId) {
        sum += get_all_vote.get_all_vote_up_down[i].count;
      }
    }
    setVote({
      count: sum,
    });
  }, [postId, get_all_vote]);

  const [voteUpDown] = useMutation(VOTE_UP_DOWN);
  const [checkTopNews] = useMutation(CHECK_TOP_NEWS);
  const redirectLogin = async () => {
    const signin = "/signin";
    const newwindow = router.push(signin);
  };
  const handleLike = async () => {
    try {
      if (state.like === false) {
        if (state.unlike === true) {
          setState({
            like: true,
            unlike: false,
          });
          await voteUpDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
              type: "up",
              count: 1,
            },
          }).then(async (response) => {
            notification.open({
              closeIcon: true,
              message: "Added to Liked news",
              description: title,
              placement: "bottomLeft",
            });
          });
        } else {
          setState({
            like: true,
            unlike: false,
          });
          await voteUpDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
              type: "up",
              count: 1,
            },
          }).then(async (response) => {
            notification.open({
              closeIcon: true,
              message: "Added to Liked news",
              description: title,
              placement: "bottomLeft",
            });
          });
        }
      } else {
        setState({
          like: false,
          unlike: false,
        });
        await voteUpDown({
          variables: {
            postId: postId,
            ownerId: ownerId,
            type: "up",
            count: 0,
          },
        }).then(async (response) => {
          notification.open({
            closeIcon: true,
            message: "Removed from Liked news",
            description: title,
            placement: "bottomLeft",
          });
        });
      }
      await checkTopNews({
        variables: {
          postId: postId,
        },
      });
    } catch (e) {
      console.log("error!!");
    }
  };
  const handleDislike = async () => {
    try {
      if (state.unlike === false) {
        if (state.like === true) {
          setState({
            like: false,
            unlike: true,
          });
          await voteUpDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
              type: "down",
              count: -1,
            },
          }).then(async (response) => {
            notification.open({
              closeIcon: true,
              message: "You dislike this news",
              description: title,
              placement: "bottomLeft",
            });
          });
        } else {
          setState({
            like: false,
            unlike: true,
          });
          await voteUpDown({
            variables: {
              postId: postId,
              ownerId: ownerId,
              type: "down",
              count: -1,
            },
          }).then(async (response) => {
            notification.open({
              closeIcon: true,
              message: "You dislike this news",
              description: title,
              placement: "bottomLeft",
            });
          });
        }
      } else {
        setState({
          unlike: false,
          like: false,
        });
        await voteUpDown({
          variables: {
            postId: postId,
            ownerId: ownerId,
            type: "down",
            count: 0,
          },
        }).then(async (response) => {
          notification.open({
            closeIcon: true,
            message: "Dislike removed",
            description: title,
            placement: "bottomLeft",
          });
        });
      }
      await checkTopNews({
        variables: {
          postId: postId,
        },
      });
    } catch (e) {
      console.log("error!!");
    }
  };
  const handleTest = () => {
    notification.open({
      closeIcon: true,
      message: "You dislike this news",
      placement: "bottomLeft",
    });
  };
  return (
    <Fragment>
      <div>
        <label className="btn-news">{vote.count > 0 ? vote.count : "0"}</label>
        <button
          className="btn-news"
          onClick={loggedIn ? handleLike : redirectLogin}
        >
          {state.like ? (
            <LikeFilled style={{ fontSize: "18px" }} />
          ) : (
            <LikeOutlined style={{ fontSize: "18px" }} />
          )}
        </button>
        <button
          className="btn-news"
          onClick={loggedIn ? handleDislike : redirectLogin}
        >
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
