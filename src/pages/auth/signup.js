import { Button, Checkbox, Form, Input, notification } from "antd";
import { SIGNUP_URL } from "../../config/server";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const [failed, setFailed] = useState(null)

  const onFinish = async (values) => {

    try {
      const { data } = await axios.post(SIGNUP_URL, values, {
        headers: {
          "content-type": "application/json",
        },
      })
      const { is_failed, error } = data;
      if (is_failed) {
        setFailed(error)
      } else {
        setTimeout(() => {
          notification.open({
            description: "Đăng ký thành công. Mời bạn đăng nhập."
          });

          navigate("/login");
        }, 2000)

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
            <h1 style={{ fontSize: "30px", fontStyle: "italic", marginLeft: '10px' }}>
              Bạn đã có tài khoản?
            </h1>
            <p style={{ width: "80%", marginLeft: '10px' }}>

              Tham gia và trải nghiệm những lợi ích website mang lại. Nó hoàn toán miễn phí và dễ dàng sử dụng


            </p>

            <h3 style={{ marginLeft: '10px', fontSize: '18px' }}><a href="/login">Đăng nhập</a></h3>

          </div>
        </div>
        <div className="right-side-login">
          <div className="right-side-login-google-login">
            <hr style={{ width: "60%", color: "black" }} />
          </div>
          <div
            className="right-side-login-default-title"
            style={{ position: "relative", left: "40%" }}
          >
            <h1 style={{ fontSize: "18px" }}>Đăng ký ngay </h1>
          </div>
          <div className="pl-20">
            <Form
              name="basic"
              labelCol={{
                span: 6,
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
                label="Tên người dùng"
                name="username"
                labelAlign='left'
                rules={[
                  {
                    required: true,
                    message: 'Định danh duy nhất và không có khoảng trống.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                labelAlign='left'
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Vui lòng nhập email hợp lệ.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                labelAlign='left'
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
                label="Nhập lại mật khẩu"
                labelAlign='left'
                name="confirm_password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu.',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Mật khẩu không khớp.');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              {failed !== null && <span className="text-red-500">{failed}</span>}
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}

              >
                <Button type="primary" htmlType="submit">
                  Đăng ký
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
