import React from 'react';
import "./Auction.css"
import { useSelector } from 'react-redux';
const AuctionName = () => {
    const {currentAuction} = useSelector((state)=>state.auction)

    return (
        <div className="auction-detail-info">
            <h5>{currentAuction.start_time}-
                Los Angeles, CA, United States
                Auction Details</h5>
            <h2>{currentAuction.name}</h2>
            <p>{currentAuction.description}
            </p>
        </div>
    )
}
export default AuctionName;