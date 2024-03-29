import React, { useContext, useState } from "react";
import { Form, Input, Button, Checkbox, message, Radio } from "antd";
import AuthContext from "../contexts/authContext";
import axios from "axios";
import Link from "next/link";

const Register = ({ history }) => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [value, setValue] = useState("male");
  const [loading, setLoading] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
  const { loggedIn } = useContext(AuthContext);
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await axios.post(`${URL_ACCESS}/auth/`, values).then((res) => {
        if (res.status === 201) {
          setLoading(true);
          message.error(res.data.msg);
          setTimeout(function () {
            setLoading(false);
          }, 1000);
        } else if (res.status === 200) {
          setLoading(true);
          message.success(res.data.msg);
          setTimeout(function () {
            setLoading(false);
            window.location.replace("/");
          }, 2000);
          // getLoggedIn();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <React.Fragment>
      {loggedIn === true && window.location.replace("/")}
      {loggedIn === false && (
        <div className="background-signin">
          <div className="register-box">
            <center>
              <h1>Register</h1>
            </center>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={
                  <label style={{ color: "white", fontWeight: "900" }}>
                    Email
                  </label>
                }
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input size="large" className="input" placeholder="Email" />
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ color: "white", fontWeight: "900" }}>
                    Fullname
                  </label>
                }
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Fullname!",
                  },
                ]}
              >
                <Input size="large" className="input" placeholder="Fullname" />
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ color: "white", fontWeight: "900" }}>
                    Password
                  </label>
                }
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  className="input"
                  placeholder="Password"
                  type="password"
                />
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ color: "white", fontWeight: "900" }}>
                    Confirm Password
                  </label>
                }
                name="passwordVerify"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label={
                  <label style={{ color: "white", fontWeight: "900" }}>
                    Gender
                  </label>
                }
              >
                <Radio.Group onChange={onChange} defaultValue={value}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <center>
                  <Button
                    disabled={loading ? true : false}
                    loading={loading ? true : false}
                    className="btn-login"
                    size="large"
                    htmlType="submit"
                  >
                    Register
                  </Button>
                </center>
              </Form.Item>
            </Form>
            <center>
              <span style={{ color: "white" }}>Have account already.</span>
              <span style={{ paddingLeft: "8px", fontWeight: "900" }}>
                <Link href="/signin">Sign In</Link>
              </span>
            </center>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Register;
