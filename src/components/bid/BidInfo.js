import React from "react";
import moment from "moment";
const BidInfo = ({bid}) => {
    const {bid_price,created_at} = bid;
    let date = moment(created_at)
    return (
        <div className="bid-info">
            <p>New bid with price: <b>{bid_price}$</b>  at {date.format("h:mm:ss A")}</p>
        </div>
    )
}
export default BidInfo;