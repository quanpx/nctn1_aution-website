import React from 'react';
import "./Auction.css"
import { useSelector } from 'react-redux';
import moment from 'moment';
const AuctionName = () => {
    const {currentAuction} = useSelector((state)=>state.auction)
    let startTime = moment(currentAuction.start_time).format('MMMM Do YYYY, hh:mm');
    return (
        <div className="auction-detail-info">
            <h5>{startTime} Los Angeles, CA, United States
            </h5>
               <h2>
               Auction Details
               </h2>
            <h3>{currentAuction.name}</h3>
            <p>{currentAuction.description}
            </p>
        </div>
    )
}
export default AuctionName;