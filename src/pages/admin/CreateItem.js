import React from 'react';
import {
  Button, DatePicker, Form,
  Input, InputNumber
} from 'antd';
import { ROOT_API } from '../../config/server';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { uploadImgae } from '../../firebase/firebase';
import { async } from '@firebase/util';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateItem = () => {
  const [user,token,isAuth]=useAuth();
  const [file, setFile] = useState();
  const [form] = Form.useForm();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }

  }
  const sendRequest = async (data) => {
    console.log(token)
    let url = ROOT_API + "lot";
    const header = {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token,
        "Acept":"application/json"
    }
    console.log(header)
    await axios.post(url, data, { headers: header })
      .then(res => console.log(res))
      .catch(err => console.log(err))

  }
  
  const onFinish = async (values)=>
  {
    uploadImgae(file)
    let body = {...values,image_url:file.name}
    await sendRequest(body);

  }
  return (
    <div>
      <h1>Create Item</h1>
      <Form onFinish={onFinish}>
        
        <Form.Item label="Name" name="name" >
          <Input />
        </Form.Item>
        <Form.Item label="Init Price" name="current_price" >
          <InputNumber/>
        </Form.Item>
        <Form.Item label="Estm Price" name="estm_price" >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Step" name="step">
          <InputNumber  />
        </Form.Item>
        <Form.Item label="Description" name='description'>
          <TextArea  />
        </Form.Item>
        <Form.Item label="Image">
          <Input type={"file"} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Create</Button>
        </Form.Item>
      </Form>
    </div>

  );
};

export default CreateItem;