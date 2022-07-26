import { style } from '@mui/system';
import { Carousel } from 'antd';
import React from 'react';
const contentStyle={
  height: '400px',

};

const Description = () => (
  <Carousel autoplay>
    <div style={{backgroundImage:process.env.PUBLIC_URL+"/anh1.jpg"}}>
      <img style={contentStyle} src={process.env.PUBLIC_URL+"/anh1.jpg"} width="95%"/>
    </div>
    <div>
    <img style={contentStyle} src={process.env.PUBLIC_URL+"/anh2.jpg"} width="95%"></img>
    </div>
    <div>
    <img style={contentStyle} src={process.env.PUBLIC_URL+"/anh3.jpg"} width="95%"></img>
    </div>
    <div>
    <img style={contentStyle} src={process.env.PUBLIC_URL+"/anh4.jpg"} width="95%"></img>
    </div>
  </Carousel>
);

export default Description;