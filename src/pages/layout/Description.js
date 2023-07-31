import {Carousel, Form, Input} from "antd";

import React, {useEffect, useState} from "react";
import "./Common.css";

const { Search } = Input;
const contentStyle1 = {
  height:'400px',
  lineHeight: "400px",
  color: "#fff",
  backgroundSize: "auto" /* <------ */,
  backgroundPosition: "center center",
  backgroundImage:
    "url(https://p1.liveauctioneers.com/3121/270752/141736214_1_x.jpg?quality=70&version=1669857713&width=400)",
  backgroundRepeat: "no-repeat",
};
const contentStyle2 = {
  height: "400px",
  lineHeight: "400px",
  color: "#fff",
  backgroundSize: "auto" /* <------ */,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundImage:
    "url(https://p1.liveauctioneers.com/3121/270752/141736113_1_x.jpg?quality=70&version=1669857713&width=400)",
};
const contentStyle3 = {
  height: "400px",
  lineHeight: "400px",
  color: "#fff",
  backgroundSize: "auto" /* <------ */,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundImage:
    "url(https://p1.liveauctioneers.com/3121/270752/141736099_1_x.jpg?quality=70&version=1669857713&width=400)",
};
const Description = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = (values) => {
    console.log("Finish:", values);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="description">
      <div className="form-join">
        <h1 className="font-custom" style={{fontSize:'45px'}}>Chào mừng đến  <br/> thế giới đồ mỹ nghệ</h1>
        <p className="font-custom" style={{fontSize:'20px',fontStyle:'italic'}}>Để lại email, chúng tôi sẽ gửi những món đồ giá trị mà bạn quan tâm</p>
        <Search
          placeholder="Email"
          enterButton="Đăng ký"
          size="large"
        />
      </div>

      <div className="carousel">
        <Carousel autoplay effect="fade">
          <div>
            <h3 style={contentStyle1}></h3>
          </div>
          <div>
            <h3 style={contentStyle2}></h3>
          </div>
          <div>
            <h3 style={contentStyle3}></h3>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Description;
