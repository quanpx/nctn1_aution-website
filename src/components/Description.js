import { Typography } from '@mui/material';
import { style } from '@mui/system';
import { Carousel } from 'antd';
import React from 'react';
import "./Header.css"
const contentStyle={
  height: '400px',

};

const Description = () => (
  <div>
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
  <div className='description'>
    <h1>Antique Auction</h1>
    <Typography>
    The U.S. Embassies are selling surplus movable property (SMP) via a Web Based Electronic Auction. Each auction will be activated for a period of time clearly stating the start and end date. This information is available on the information panel of the web application. Usually it will be active from Monday to Friday lasting two weeks. During this period you can actively take part and submit your bid for the surplus property.
    </Typography>
  </div>
  </div>
);

export default Description;