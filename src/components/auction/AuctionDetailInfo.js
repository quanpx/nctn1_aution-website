import { Card } from "antd";
import React, { useEffect } from 'react';
import "./Auction.css";
import AuctionName from "./AuctionName";
import AuctionTime from "./AuctionTime";
const AuctionDetailInfo = () => {
    return (
        <div className="auction-info">
           
            <AuctionName/>
            <AuctionTime/>
        </div>
    )
}
export default AuctionDetailInfo;