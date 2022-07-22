import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
} from 'antd';
import DateTimePicker from 'react-datetime-picker';
import { useLocation } from 'react-router-dom';
import { sendPostRequest } from '../../utils/request';
import { ROOT_API } from '../../config/server';
import { useAuth } from '../../hooks/useAuth';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateAuction = () => {
  const [user,token,isAuth]=useAuth();
  const location = useLocation();
  const [value, onChange] = useState(new Date());
  const [lot, setLot] = useState([]);
  const [form] = Form.useForm();
  const [children,setChildren]=useState([]);

  useEffect(() => {
    let lotItems = location.state != null ? [...location.state] : [];
    console.log(lotItems);
    setLot(lotItems);
    let ids = lotItems.map(item=>item.id);
    setChildren(ids);
    console.log(children);
  }, [])
  // console.log(location.state);
  // lot.forEach(item => setChildren(prev=>[...prev,item.id]));

  const toTimestamp = (strDate) => {
    const dt = Date.parse(strDate);
    return dt;
  }
  const handleCreate = async (e) => {
    let startTime = form.getFieldValue("time");
    let startTimeStamp = toTimestamp(startTime);
    e.preventDefault();
    const body = {
      name: form.getFieldValue("name"),
      start_time: startTimeStamp,
      description: form.getFieldValue("description"),
      item_ids: children
    }

    let url = ROOT_API + "auction";
    const header = {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token,
        "Acept":"application/json"
    }
     await sendPostRequest(url,body,header);
  }
  


  return (
     children.length!=0? <Form
      form={form}
      layout="horizontal"
    >
      <Form.Item label="Name" name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label="Start time" name="time">
        <DateTimePicker onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item label="Description" name={"description"}>
        <TextArea />
      </Form.Item>
      <Form.Item label="Lot Ids" name={'item_ids'} >
        <Select
          mode="multiple"
          disabled
          style={{
            width: '100%',
          }}
          placeholder="Please select"
          defaultValue={children}
        >

        </Select>
      </Form.Item>
      <Form.Item >
        <Button onClick={handleCreate}>Button</Button>
      </Form.Item>
    </Form>:<h1>Wait</h1>
  );
};

export default CreateAuction;