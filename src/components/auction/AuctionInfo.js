import React from 'react';
import AuctionDetailInfo from "./AuctionDetailInfo";
import AuctionImage from "./AuctionImage";

const AuctionInfo = ({auction}) =>
{
    return (
        <div>
            <AuctionImage/>
            <AuctionDetailInfo auction = {auction}/>
        </div>
    )
}
export default AuctionInfo;