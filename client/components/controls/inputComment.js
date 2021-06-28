import { Fragment } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";

const { TextArea } = Input;
const InputComment = ({ onChange, onSubmit, submitting, value }) => {
  return (
    <Fragment>
      <Form.Item>
        <TextArea
          // rows={4}
          showCount
          maxLength={100}
          onChange={onChange}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          style={{
            backgroundColor: "#fce24a",
            borderColor: "#fce24a",
            color: "#262e2c",
          }}
        >
          Comment
        </Button>
      </Form.Item>
    </Fragment>
  );
};

export default InputComment;
