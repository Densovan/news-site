import { Fragment, useState } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";

const { TextArea } = Input;
const InputComment = ({ onChange, onSubmit, submitting, value, commentId }) => {
  console.log(value);
  return (
    <Fragment>
      <Form.Item
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <TextArea
          className="input-comment"
          showCount
          maxLength={100}
          onChange={onChange}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          className="btn-comment"
        >
          Comment
        </button>
      </Form.Item>
    </Fragment>
  );
};

export default InputComment;
