import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import AuthContext from "../contexts/authContext";
import axios from "axios";

const Login = ({ history }) => {
  const { getLoggedIn } = useContext(AuthContext);
  const { loggedIn } = useContext(AuthContext);
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await axios
        .post("http://localhost:3500/auth/login", values)
        .then((res) => {
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
            <h1>Login</h1>
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

export default Login;
