import React, { useContext, useState } from "react";
import LayoutAuth from "../components/Layouts/layoutAuth";
import Link from "next/link";
import { Form, Input, Button, Checkbox, message, Radio } from "antd";
import AuthContext from "../contexts/authContext";
import axios from "axios";
import Cookie from "js-cookie";

const Login = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [loading, setLoading] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
  const { loggedIn } = useContext(AuthContext);
  const onFinish = async (values) => {
    try {
      // await axios.post(`${URL_ACCESS}/auth/login`, values).then((res) => {
      //   if (res.status === 201) {
      //     setLoading(true);
      //     message.error(res.data.msg);
      //     setTimeout(function () {
      //       setLoading(false);
      //     }, 1000);
      //   } else if (res.status === 200) {
      //     setLoading(true);
      //     message.success(res.data.msg);
      //     setTimeout(function () {
      //       window.location.replace("/");
      //       setLoading(false);
      //     }, 2000);
      //   }
      // });
      await axios
        .post(
          "https://accounts.koompi.com/login",
          { ...values },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(async (res) => {
          const { access_token, refresh_token } = res.data;
          setLoading(true);
          // Cookie.set('_sid', res.data._id, { expires: 7 })
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          await message.success("Logged In Successfully");
          // window.location.replace("/");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {loggedIn && window.location.replace("/")}
      {!loggedIn && (
        <div className="background-signin">
          {/* <center> */}
          <div className="register-box">
            <center>
              <h1>LOGIN</h1>
            </center>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                // label="Email"
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
                <Input
                  size="large"
                  className="input"
                  placeholder="Email"
                  type="email"
                />
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
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
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
                    Sign In
                  </Button>
                </center>
              </Form.Item>
            </Form>
            {/* <center>
              <Button
                disabled={loading ? true : false}
                loading={loading ? true : false}
                className="btn-login"
                size="large"
                htmlType="submit"
              >
                Sign In with Google
              </Button>
            </center> */}
            <center>
              <span style={{ color: "white" }}>Do not have an account?</span>
              <span style={{ paddingLeft: "12px", fontWeight: "900" }}>
                <Link href="/register">Create new account</Link>
              </span>
            </center>
          </div>
          {/* </center> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
// Login.getLayout = (page) => (
//   <LayoutAuth>
//     {page}
//   </LayoutAuth>
// )
