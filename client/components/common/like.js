import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE } from "../../graphql/mutation";

const like = ({ postId, userId, likes, contextId, refetch }) => {
  const [like] = useMutation(LIKE);
  const [state, setState] = useState(false);
  const [likess, setLike] = useState(null);

  useEffect(() => {
    if (likes !== null) {
      if (likes.length === 0) {
        setState(false);
      } else {
        likes.map((res) => {
          if (res.userId === contextId) {
            setState(true);
            setLike(res.userId);
          }
        });
      }
    }
  });
  console.log("data", contextId);
  const handleClick = (e) => {
    e.preventDefault();
    like({
      variables: {
        postId,
        userId,
      },
    }).then(() => refetch());
  };

  //   console.log(data.get_user.id);
  console.log("like", likes);
  return (
    <div>
      {state === false && <Button onClick={handleClick}>like</Button>}
      {state === true && (
        <p>
          {likess === contextId && (
            <Button onClick={handleClick}>Unlike</Button>
          )}
          {likess !== contextId && <Button onClick={handleClick}>like</Button>}
        </p>
      )}
    </div>
  );
};

export default like;
