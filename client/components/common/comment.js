import React, { createElement, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

import { COMMENT, REPLY_COMMENT } from "../../graphql/mutation";
import { GET_USER } from "../../graphql/query";
import InputComment from "../controls/inputComment";

const FormComment = ({ articleId, commentId }) => {
  const { loading: loading, data: user } = useQuery(GET_USER);
  const [addComment] = useMutation(COMMENT);
  const [replyComment] = useMutation(REPLY_COMMENT);

  const [value, setValue] = useState({
    submitting: false,
    comment: "",
  });

  if (loading) return <div>Loadin...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentId) {
      replyComment({
        variables: {
          userId: user.get_user.id,
          postId: articleId,
          answer: value.comment,
          questionId: commentId,
        },
      }).then(async (data) => {
        setValue({
          submitting: true,
        });
        setTimeout(() => {
          setValue({
            submitting: false,
          });
        }, 1000);
      });
    } else {
      addComment({
        variables: {
          userId: user.get_user.id,
          postId: articleId,
          question: value.comment,
        },
      }).then(async (data) => {
        setValue({
          submitting: true,
        });
        setTimeout(() => {
          setValue({
            submitting: false,
          });
        }, 1000);
      });
    }
  };

  return (
    <Comment
      // author={<a href="#">{user.get_user.fullname}</a>}
      avatar={<Avatar src={user.get_user.image} />}
      content={
        <InputComment
          onChange={(e) => setValue({ ...value, ["comment"]: e.target.value })}
          onSubmit={handleSubmit}
          submitting={value.submitting}
          value={value.comment}
        />
      }
    />
  );
};

export default FormComment;
