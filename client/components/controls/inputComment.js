import { Fragment, useState } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";

const { TextArea } = Input;
const InputComment = ({ onChange, onSubmit, submitting, value, commentId }) => {
  const [state, setState] = useState(commentId);
  return (
    <Fragment>
      <Form.Item>
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
          // style={{
          //   backgroundColor: "#fce24a",
          //   borderColor: "#fce24a",
          //   color: "#262e2c",
          // }}
          className="btn-comment"
        >
          Comment
        </button>
      </Form.Item>
    </Fragment>
  );
};

export default InputComment;
