import React, { createElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Comment, Avatar, Form, Input, Button } from "antd";

import {
  COMMENT,
  REPLY_COMMENT,
  EDIT_COMMENT,
  EDIT_REPLY,
} from "../../graphql/mutation";
import { GET_USER } from "../../graphql/query";
import { useRouter } from "next/router";

const FormComment = (props) => {
  const router = useRouter();
  const {
    articleId,
    ownerId,
    comments,
    object,
    getName,
    keyBtn,
    keyEdit,
    textEdit,
    keyAdd,
    keySubmit,
  } = props;
  const { loading: loading, data: user } = useQuery(GET_USER, {
    pollInterval: 500,
  });
  const [addComment] = useMutation(COMMENT);
  const [replyComment] = useMutation(REPLY_COMMENT);
  const [editComment] = useMutation(EDIT_COMMENT);
  const [editReply] = useMutation(EDIT_REPLY);

  if (loading) return <div>Loading...</div>;

  // console.log(ownerId);
  // return to reset data
  const handleReset = () => {
    if (keyBtn === "editReplyQuestion") {
      props.doReset("editReplyQuestion", null);
    }
    if (keyBtn === "editReplyAnswer") {
      props.doReset("editReplyAnswer", null);
    }
    if (keyBtn === "replyComment") {
      props.doReset("replyComment", null);
    }
    if (keyBtn === "replyAnswer") {
      props.doReset("replyAnswer", null);
    }
  };

  //we get key check button cancel
  let btnCancel = [];
  if (keyBtn === "editReplyQuestion") {
    btnCancel.push("Cancel");
  }
  if (keyBtn === "editReplyAnswer") {
    btnCancel.push("Cancel");
  }
  if (keyBtn === "replyComment") {
    btnCancel.push("Cancel");
  }
  if (keyBtn === "replyAnswer") {
    btnCancel.push("Cancel");
  }

  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      if (keySubmit === "replyQuestion") {
        try {
          replyComment({
            variables: {
              userId: user.get_user.accountId,
              postId: articleId,
              answer: values.comment,
              questionId: comments.id,
              ownerId: ownerId,
              userIdTo: comments.user.accountId,
            },
          }).then(async (data) => {
            console.log(data);
          });
          props.getCheck("answerType", null);
        } catch (e) {
          console.log(e);
        }
      } else if (keySubmit === "editQuestion") {
        try {
          editComment({
            variables: {
              id: object.id,
              userId: user.get_user.accountId,
              postId: articleId,
              question: values.comment,
            },
          }).then(async (data) => {
            console.log(data);
            props.getCheck("question", null);
          });
        } catch (e) {
          console.log(e);
        }
      } else if (keySubmit === "editAnswer") {
        try {
          editReply({
            variables: {
              id: object.id,
              userId: user.get_user.id,
              answer: values.comment,
            },
          }).then(async (data) => {
            console.log(data);
            props.getCheck("answer", null);
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          addComment({
            variables: {
              postId: articleId,
              question: values.comment,
              ownerId: ownerId,
            },
          }).then(async (data) => {
            console.log(data);
            form.resetFields();
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const comment = [];
  // user can sent key for edit comment
  if (keyEdit === "Question") {
    comment.push(textEdit);
  }
  if (keyEdit === "Answer") {
    comment.push(textEdit);
  }
  // user can sent key for add comment
  if (keyAdd === "Question") {
    comment.push(`@${getName} : `);
  }
  if (keyAdd === "Answer") {
    comment.push(`@${getName} : `);
  }

  const inputRef = React.useRef(null);
  const sharedProps = {
    style: {
      width: "100%",
    },
    defaultValue: comment[0],
    ref: inputRef,
  };
  return (
    <Comment
      avatar={<Avatar src={user.get_user.image} />}
      content={
        <Form form={form} name="control-ref" onFinish={onFinish}>
          <Form.Item
            name="comment"
            rules={[
              {
                required: true,
                message: "Please input your comment!",
              },
            ]}
          >
            <Input.TextArea
              className="input-comment"
              showCount
              maxLength={100}
              {...sharedProps}
            />
          </Form.Item>
          <div style={{ display: "flex" }}>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  className="btn-comment"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  {object === undefined ? "Post" : "Update"}
                </Button>
              )}
            </Form.Item>
            <Form.Item>
              {btnCancel[0] === "Cancel" && (
                <button className="btn-reset" onClick={handleReset}>
                  Cancel
                </button>
              )}
            </Form.Item>
          </div>
        </Form>
      }
    />
  );
};

export default FormComment;
