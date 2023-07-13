import React from 'react';
import AuctionDetailInfo from "./AuctionDetailInfo";
import AuctionImage from "./AuctionImage";

const AuctionInfo = () => {
    return (
        <div className='py-4 border-b-4'>
            <AuctionImage />
            <AuctionDetailInfo />
        </div>
    )
}
export default AuctionInfo;