import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import AuthContext from "../contexts/authContext";
import axios from "axios";

const Register = ({ history }) => {
  const { getLoggedIn } = useContext(AuthContext);
  const { loggedIn } = useContext(AuthContext);
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await axios.post("http://localhost:3500/auth/", values).then((res) => {
        if (res.status === 201) {
          message.warning(res.data.msg);
        } else if (res.status === 200) {
          message.success(res.data.msg);
          getLoggedIn();
          window.location.replace("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {loggedIn === true && window.location.replace("/")}
      {loggedIn === false && (
        <center>
          <div className="register-box">
            <h1>Register</h1>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Fullname"
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Fullname!",
                  },
                ]}
              >
                <Input placeholder="Fullname" />
              </Form.Item>
              <Form.Item
                label="password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input placeholder="Password" type="password" />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="passwordVerify"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                ]}
              >
                <Input type="password" placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </center>
      )}
    </React.Fragment>
  );
};

export default Register;
