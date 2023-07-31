import { Button, Checkbox, Form, Input } from "antd";
import { LOGIN_URL } from "../../config/server";
import React from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./login.css";
import { useDispatch } from "react-redux";
import userSlice from "../../hooks/slices/userSlice";
import { login } from "../../hooks/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const redirectTo =searchParams.get("redirectTo") !==null ? decodeURIComponent(searchParams.get('redirectTo')) : null
  console.log(redirectTo);
  const onFinish = async (values) => {
    await axios
      .post(LOGIN_URL, values, {
        headers: {
          // 'application/json' is the modern content-type for JSON, but some
          // older servers may use 'text/json'.
          // See: http://bit.ly/text-json
          "content-type": "application/json",
        },
      })
      .then((res) => res.data)
      .then((data) => {
        const userState = {
          name: data.name,
          token: data.access_token,
          isAuth: true
        }

        dispatch(login(userState))
        
        localStorage.setItem("AUCTION_TOKEN", data.access_token);
        localStorage.setItem("AUCTION_USER", data.name);
        localStorage.setItem("IS_AUTH", true);
          localStorage.setItem("USER_ROLE", data.role[0]);
          console.log(data)
        if (data.role.includes("admin", 0)) {
          navigate("/admin");
        }else {
          if(redirectTo!==null)
          {
            console.log(redirectTo);
            navigate(redirectTo);
          }else 
          {
            navigate("/")
          }
    
        }
      })
      .catch((err) => alert(err));
  };

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
            <h1 className="text-2xl ml-3">
             
              Bạn là người mới ?
            </h1>
            <p style={{ width: "80%" ,marginLeft:'10px'}}>
              
              Tham gia và trải nghiệm những lợi ích website mang lại. Nó hoàn toán miễn phí và dễ dàng sử dụng

            
            </p>

              <button className="p-1" onClick={()=>navigate("/signup")} type="submit">Tạo tài khoản mới</button>
          
          </div>
        </div>
        <div className="right-side-login">
          <div className="right-side-login-google-login">
           
            <br />
            <hr style={{ width: "60%", color: "black" }} />
          </div>
          <div
            className="right-side-login-default-title"
            style={{ position: "relative", left: "45%" }}
          >
            <h1 style={{ fontSize: "18px" }}>Đăng nhập </h1>
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
            message: 'Please input your username!',
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
