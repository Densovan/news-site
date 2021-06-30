import React, { createElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Comment, Tooltip, Avatar } from "antd";

import {
  COMMENT,
  REPLY_COMMENT,
  EDIT_COMMENT,
  EDIT_REPLY,
} from "../../graphql/mutation";
import { GET_USER } from "../../graphql/query";
import InputComment from "../controls/inputComment";
import { useRouter } from "next/router";

const FormComment = (props) => {
  const router = useRouter();
  const { articleId, commentId, object, check, getName } = props;
  const { loading: loading, data: user } = useQuery(GET_USER, {
    pollInterval: 500,
  });
  const [addComment] = useMutation(COMMENT);
  const [replyComment] = useMutation(REPLY_COMMENT);
  const [editComment] = useMutation(EDIT_COMMENT);
  const [editReply] = useMutation(EDIT_REPLY);

  const [value, setValue] = useState({
    submitting: false,
    comment: "",
  });
  useEffect(() => {
    if (!object) {
      return;
    } else {
      if (check === "Answer") {
        setValue({
          comment: object.answer,
        });
      }
      if (check === "Question") {
        setValue({
          comment: object.question,
        });
      }
    }
  }, [object]);
  useEffect(() => {
    if (check === "answerType") {
      setValue({
        comment: `@${getName}`
      })
    }
  },[])

  if (loading) return <div>Loading...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (check === "answerType") {
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
      props.getCheck("answerType", null);
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

  const handleEdit = (e) => {
    e.preventDefault();
    if (check === "undefined") {
      return;
    }
    if (check === "Answer") {
      editReply({
        variables: {
          id: object.id,
          userId: user.get_user.id,
          answer: value.comment,
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
        props.getCheck("answer", null);
      });
    }
    if (check === "Question") {
      editComment({
        variables: {
          id: object.id,
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
        props.getCheck("question", null);
      });
    }
  };

  return (
    <Comment
      avatar={<Avatar src={user.get_user.image} />}
      content={
        <InputComment
          onChange={(e) => setValue({ ...value, ["comment"]: e.target.value })}
          onSubmit={object === undefined ? handleSubmit : handleEdit}
          submitting={value.submitting}
          value={value.comment}
          checkBtn={object === undefined ? "Post" : "Update"}
          // name={getName !== 'undefined' && getName}
          // commentId={commentId}
        />
      }
    />
  );
};

export default FormComment;
