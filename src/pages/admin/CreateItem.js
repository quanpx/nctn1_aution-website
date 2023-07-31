import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, notification} from 'antd';
import {LOT_URL} from '../../config/server';
import axios from 'axios';
import {useAuth} from '../../hooks/useAuth';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {SmileOutlined} from '@ant-design/icons';

const {TextArea} = Input;

const CreateItem = () => {
    const {token} = useAuth();
    const [url, setUrl] = useState();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            const storage = getStorage();
            const storageRef = ref(storage, "images/" + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed',
                (snapshot) => {
                },
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

    const sendRequest = async (data) => {
        console.log(token)
        const header = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
        console.log(header)
        await axios.post(LOT_URL, data, {headers: header})
            .then(res => {
                console.log(res)
                notification.open({
                    message: 'Create Success',
                    description:
                        'You have just added item ' + data.name,
                    icon: (
                        <SmileOutlined
                            style={{
                                color: '#108ee9',
                            }}
                        />
                    ),
                });
            })
            .catch(err => console.log(err))

    }

    const onFinish = async (values) => {
        let body = {...values, image_url: url}
        console.log(body);
        await sendRequest(body);

    }
    return (
        <div>
            <h1>Create Item</h1>
            <Form onFinish={onFinish}>

                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Init Price" name="current_price">
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Estm Price" name="estm_price">
                    <Input/>
                </Form.Item>
                
                <Form.Item label="Description" name='description'>
                    <TextArea/>
                </Form.Item>
                <Form.Item label="Image">
                    <Input type={"file"} onChange={handleChange}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>Create</Button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default CreateItem;