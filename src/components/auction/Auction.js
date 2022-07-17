import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const Auction = ({ aution }) => {
  const navigate=useNavigate();
  const handleClick = ()=>{
      navigate("/auction/"+aution.id)
  }
  return(
    <Card 
     hoverable={true}
      style={{
        width: 300,
      }}
      onClick={handleClick}
      cover={
        <img height={90}
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta
        title={aution.type}
        description={`${aution.num_item} lots - ${aution.register_num} followers`}
      />

      <Button><HeartOutlined key="heart" /> Follow this auction</Button>
    </Card>
)};
export default Auction;