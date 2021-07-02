import { Fragment} from "react";
import { Form, Button, Input } from "antd";

const { TextArea } = Input;
const InputComment = ({
  onChange,
  onSubmit,
  onReset,
  submitting,
  value,
  checkBtn,
  cancelBtn,
}) => {
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
          {checkBtn}
        </button>

        {cancelBtn == "Cancel" && (
          <button onClick={onReset} className="btn-reset">
            {cancelBtn}
          </button>
        )}
      </Form.Item>
    </Fragment>
  );
};

export default InputComment;
