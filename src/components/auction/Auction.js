import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Meta } = Card;

const Auction = ({ aution }) => {
  const navigate=useNavigate();
  const handleClick = ()=>{
      navigate("/auction/"+aution.id)
  }
  return(
    <>
     <Card className='auction-card'
     hoverable={true}
      style={{
        width: 400,
        height:300,
      }}
      onClick={handleClick}
      cover={
        <img height={90}
          alt="example"
          src={aution.image_url}
        />
      }
    >
      <Meta
        title={aution.type}
        description={`${aution.num_item} lots - ${aution.register_num} followers`}
      />

      <Button><HeartOutlined key="heart" /> Follow this auction</Button>
    </Card>
    <Link to={"/auction-stream/"+aution.id}><h5>Go to live</h5></Link>
    </>
   
    
)};
export default Auction;