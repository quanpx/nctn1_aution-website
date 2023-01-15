import React from "react";
import { HeartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./Auction.css";
const { Meta } = Card;

const Auction = ({ aution }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auction/" + aution.id);
  };
  return (
    <div className="auction">
      {aution.is_new ? <h1 className="status">New</h1> : <h1> </h1>}

      <Card
        className="auction-card"
        hoverable={true}
        style={{
          width: 270,
          height: 320,
        }}
        onClick={handleClick}
        cover={<img height={200} alt={aution.name} src={aution.image_url} />}
      >
        <Meta
          title={aution.name}
          description={`${aution.num_item} lots - ${aution.register_num} followers`}
        />

        <Button style={{ position: "absolute", bottom: 6, left: 26, backgroundColor: 'rgb(0, 97, 127)' }}>
          <HeartOutlined style={{ color: 'white' }} key="heart" /> <span style={{ color: 'white', fontWeight: 'bold' }}>Follow this auction</span>
        </Button>
      </Card>
    </div>
  );
};
export default Auction;
