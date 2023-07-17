import React, { useState } from "react"
import { Button, Form, Input, Radio } from 'antd';
const StayConnect = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('inline');
    return (
        <div className="m-10 flex flex-row gap-x-10">
           <div className="w-full">
                <img className="px-20 hover:scale-110 transition duration-100" src={process.env.PUBLIC_URL + '/images/signup.jpg'} height="auto"/>
                <div className="mt-2 p-5 mx-2s">
                    <h1 className="text-2xl">Đăng ký để nhận thông báo mới nhất</h1>
                    <p>Bất cứ khi nào có phiên đấu giá mới, chúng tôi sẽ thông báo đến bạn
                    </p>
                    <Button type="primary">Đăng ký</Button>
                </div>
              
           </div>
           <div className="w-full">
           <img className="px-20 hover:scale-110 transition duration-100" src={process.env.PUBLIC_URL + '/images/aboutus.jpg'} height="auto"/>
                <div className="mt-2 p-5 mx-2" >
                    <h1 className="text-2xl">Chúng tôi mang đến</h1>
                    <p >
                        Đấu giá các đồ thủ công mỹ nghệ, đồ gốm, sứ, tranh của các họa sĩ nổi tiếng… đến đấu thầu các công trình nhà ở, khu đô thị …
                    </p>
                    <Button type="primary">Đọc thêm</Button>
                </div>
           </div>

        </div>

    );

}

export default StayConnect;