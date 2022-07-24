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
  notification,
} from 'antd';
import DateTimePicker from 'react-datetime-picker';
import { useLocation } from 'react-router-dom';
import { sendPostRequest } from '../../utils/request';
import { ROOT_API } from '../../config/server';
import { useAuth } from '../../hooks/useAuth';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { SmileOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateAuction = () => {
  const [user,token,isAuth]=useAuth();
  const location = useLocation();
  const [value, onChange] = useState(new Date());
  const [lot, setLot] = useState([]);
  const [form] = Form.useForm();
  const [children,setChildren]=useState([]);
  const [url,setUrl]=useState();


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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      let file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file)
    
      uploadTask.on('state_changed',
        (snapshot) => { },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
    
            // ...
    
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => setUrl(downloadUrl));
        })
    
    }
  }
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
      item_ids: children,
      image_url:url
    }

    let urlResource = ROOT_API + "auction";
    const header = {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token,
        "Acept":"application/json"
    }
     await sendPostRequest(urlResource,body,header)
     .then(res=>notification.open({
      message: 'Create Success',
          description:
            'You have just added auction '+body.name,
          icon: (
            <SmileOutlined
              style={{
                color: '#108ee9',
              }}
            />
          ),
     }))
     .catch(err=>{
      notification.open({
        message: 'Create Error',
          description:
            'Error add '+body.name,
          icon: (
            <SmileOutlined
              style={{
                color: '#108ee9',
              }}
            />
          ),
      })
     })
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
      <Form.Item label="Image">
          <Input type={"file"} onChange={handleChange} />
        </Form.Item>
      <Form.Item >
        <Button onClick={handleCreate}>Button</Button>
      </Form.Item>
    </Form>:<h1>Wait</h1>
  );
};

export default CreateAuction;