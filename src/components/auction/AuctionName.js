import React from 'react';
import "./Auction.css"
import { useSelector } from 'react-redux';
const AuctionName = ({ auction }) => {
    const data = auction.auction;
    const generateLinkStream = () => {
        if (data.status == 'start') {

            return <p className='text-base p-3'> <b>The live is starting. You can join now!</b> <br />
                <a href={`/auction-stream/${data.id}`}>Go to live</a>
            </p>
        }else if(data.status == 'end')
        {
            return <h2 className='text-red-800'>! This auction had already finished! Please back soon.</h2>
        }
    }
    return (
        <div className="auction-detail-info">
            <h5>{data.start_time}-
                Los Angeles, CA, United States
                Auction Details</h5>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            {generateLinkStream()}
        </div>
    )
}
export default AuctionName;