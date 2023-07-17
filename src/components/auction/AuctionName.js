import React from 'react';
import "./Auction.css"
import { useSelector } from 'react-redux';
const AuctionName = ({ auction }) => {
    const data = auction.auction;
    const newWindowStream = () => {
        var url =
        window.open("https://google.com", '_blank', 'location=yes,height=1000,width=980,scrollbars=yes,status=yes')
    }
    const generateLinkStream = () => {
        if (data.status == 'start') {
            return <p className='text-base p-3'> <b>The live is starting. You can join now!</b> <br />
                 <button onClick={(e) => { e.preventDefault() ; window.open( `/auction-stream/${data.id}`, '_blank', 'location=yes,height=800,width=900,scrollbars=yes,status=yes')}}>
                Go to live
            </button>
            </p>
        } else if (data.status == 'end') {
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