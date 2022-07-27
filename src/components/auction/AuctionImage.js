import { Image } from 'antd';
import React from 'react';
import "./Auction.css"
const AuctionImage = () => (
    <div className='auction-images'>
        <div className='auction-image'>
        <img src={process.env.PUBLIC_URL+"/anh1.jpg"} width={300}/>
        </div>
        <div className='aution-image'>
        <img src={process.env.PUBLIC_URL+"/anh2.jpg"}  width={300}/>
        </div>
        <div className='aution-image'>
        <img src={process.env.PUBLIC_URL+"/anh3.jpg"}  width={300}/>
        </div>

    </div>

);

export default AuctionImage;