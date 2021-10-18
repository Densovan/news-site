import React, { useState, useEffect } from 'react';
import LayoutDefault from '../layouts/layoutDefault';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Button, Checkbox, message, Radio } from 'antd';
import api from '../services/api';

const Login = () => {
  const router = useRouter();
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === 'development' ? server_local : server;

  const [state, setState] = useState({
    loading: false,
    token: null
  });

  const onFinish = async (values) => {
    try {
      const {
        data: { refresh_token, access_token, success },
      } = await api.post('login', {
        email: values.email,
        password: values.password,
      });
      if (success) {
        setState({
          loading: true,
        });
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        await message.success('Logged In Successfully');
        setTimeout(() => {
          window.location.pathname('/')
          setState({
            loading: false,
          });
        }, 1000);
      }
    } catch (error) {
      message.error('Invalid email or password');
    }
  };
  return (
    <React.Fragment>
      <Form layout="vertical" onFinish={onFinish}>
        <div className="background-signin">
          <div className="register-box">
            <center>
              <h1>LOGIN</h1>
            </center>
            <Form.Item
              label={
                <label style={{ color: 'white', fontWeight: '900' }}>
                  Email
                </label>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
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
                <label style={{ color: 'white', fontWeight: '900' }}>
                  Password
                </label>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
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
                <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <center>
                <Button
                  disabled={state.loading ? true : false}
                  loading={state.loading ? true : false}
                  className="btn-login"
                  size="large"
                  htmlType="submit"
                >
                  Sign In
                </Button>
              </center>
            </Form.Item>
            <center>
              <span style={{ color: 'white' }}>Do not have an account?</span>
              <span style={{ paddingLeft: '12px', fontWeight: '900' }}>
                <Link href="/register">Create new account</Link>
              </span>
            </center>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default Login;
Login.getLayout = (page) => <LayoutDefault>{page}</LayoutDefault>;
