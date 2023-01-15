import { Button, Checkbox, Form, Input } from "antd";
import { SIGNUP_URL } from "../../config/server";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
      console.log("Success:", values);
      try {
          const {data} = await axios.post(SIGNUP_URL, values, {
              headers: {
                  "content-type": "application/json",
              },
          })
          console.log(data);
          localStorage.setItem("AUCTION_TOKEN", data.access_token);
          localStorage.setItem("AUCTION_USER", data.name);
          localStorage.setItem("IS_AUTH", true);
          localStorage.setItem("USER_ROLE", data.role);

          if (data.role.includes("admin", 0)) {
              navigate("/admin");
          } else {
              navigate("/");
          }
      } catch (err) {
          console.log(err);
      }
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-page">
      <div className="login-page-title">
        <h1 style={{ fontSize: "40px", fontStyle: "italic", color: "red" }}>
          BleuDeQuan
        </h1>
      </div>
      <div className="login-page-content">
        <div className="left-side-login">
          <div>
            <img
              className="login-img"
              src={process.env.PUBLIC_URL + "/images/login.png"}
            />
            <h1 style={{ fontSize: "30px", fontStyle: "italic" ,marginLeft:'10px'}}>
              Already have an account
            </h1>
            <p style={{ width: "80%" ,marginLeft:'10px'}}>
              <b>
                Join and enjoy all the benefits: its easy and free. Creating an
                account allows you to watch all Drouot sales
              </b>
            </p>

            <h3 style={{marginLeft:'10px',fontSize:'18px'}}><a href="/login">Sign In</a></h3>
          
          </div>
        </div>
        <div className="right-side-login">
          <div className="right-side-login-google-login">
            <h1 id="login-with-google-title" style={{ fontSize: "24px" }}>
              {" "}
              Sign in with
            </h1>
            <img
              className="google-login"
              src={process.env.PUBLIC_URL + "/images/search.png"}
            />
            <br />
            <br />
            <hr style={{ width: "60%", color: "black" }} />
          </div>
          <div
            className="right-side-login-default-title"
            style={{ position: "relative", left: "40%" }}
          >
            <h1 style={{ fontSize: "18px" }}>or sign up now </h1>
          </div>
          <div className="right-side-login-default-login">
          <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
        
      <Form.Item
        label="Confirm Password"
        name="confirm_password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}  
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
