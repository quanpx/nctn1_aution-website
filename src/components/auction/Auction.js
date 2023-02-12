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
    <div className="relative">
      {aution.is_new ? <h1 className="status">New</h1> : <h1> </h1>}

      <Card
        hoverable={true}
        style={{
          width: 240,
          height: 360,
        }}
        onClick={handleClick}
        cover={<img height={150} alt={aution.name} src={aution.image_url} />}
      >
        <Meta
          title={aution.name}
          description={`${aution.num_item} lots - ${aution.register_num} followers`}
        />

        <Button className="absolute bottom-0 right-1 bg-cyan-800 mt-2">
          <HeartOutlined key="heart" /> <span className="text-red-500">Follow this auction</span>
        </Button>
      </Card>
    </div>
  );
};
export default Auction;
