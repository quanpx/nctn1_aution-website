import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROOT_API } from '../../config/server';

const Signup = () => {
    const [pwd,setPwd]=useState();
    const [cfPwd,setCfPwd]=useState();
    const navigate=useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    
    await axios.post(ROOT_API+"signup",values)
    .then(res=>{
        notification.open({
            message: 'Signup Success',
            description:
                "Create new account success!",
            icon: <CheckOutlined />,
        });
        navigate("/login")
    })
    .catch(error=>
        {
            notification.open({
                message: 'Sigup failed!',
                description:
                    "Create new account failed!",
                icon: <ExclamationOutlined />,
            });
        })
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const checkPwdMatch = () =>
  {
    if (cfPwd==pwd) {
        return Promise.resolve();
    }

    return Promise.reject(new Error('Confirm password not match!'));
  }
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
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
        <Input.Password onChange={(e)=>setPwd(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="comfirm"
        rules={[
          {
            required: true,
            validator:checkPwdMatch
          },
        ]}
      >
        <Input.Password onChange={(e)=>setCfPwd(e.target.value)} />
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
  );
};

export default Signup;