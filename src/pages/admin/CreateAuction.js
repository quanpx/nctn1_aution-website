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
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateAuction= () => {
  const location=useLocation();
    const [value, onChange] = useState(new Date());
    const [lot,setLot]=useState();
    const [form]= Form.useForm();
   
   
    useEffect(()=>
    {
      let lotItems=location.state!=null?[...location.state]:[];
      setLot(lotItems);
      return ()=>location.state==null;
    },[])
    console.log(location.state);
    let children=[]
    lot.forEach(item => children.push(item.id));
   

    const toTimestamp = (strDate) => {  
        const dt = Date.parse(strDate);  
        return dt;  
      }  
    const handleCreate = (e) =>
    {
        let startTime = form.getFieldValue("time");
        let startTimeStamp=toTimestamp(startTime);
        e.preventDefault();
        const body = {
            name:form.getFieldValue("name"),
            start_time:startTimeStamp,
            description:form.getFieldValue("description"),
            item_ids:children
        }
        console.log(body);
    }
   
    
  return (
    <Form
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
        <TextArea  />
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
    </Form>
  );
};

export default CreateAuction;