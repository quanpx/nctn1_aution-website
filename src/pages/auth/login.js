import { Button, Checkbox, Form, Input } from 'antd';
import { ROOT_API } from '../../config/server';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Success:', values);
    let url = ROOT_API+"login";
    const header = {

    }
    await axios.post(url,values,{
        headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'content-type': 'application/json'
          }
    })
    .then(res=>res.data)
    .then(data=>
        {
          console.log(data);
            localStorage.setItem("AUCTION_TOKEN",data.access_token);
            localStorage.setItem("AUCTION_USER",data.name);
            localStorage.setItem("IS_AUTH",true);

            if(data.role.includes("admin",0))
            {
              navigate("/admin")
            }else
            {
              navigate("/")
            }

        })
    .catch(err=>alert(err))
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
        <h1>Login</h1>
        <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
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
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};

export default Login;