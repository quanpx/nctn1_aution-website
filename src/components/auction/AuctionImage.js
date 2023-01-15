import { Image } from 'antd';
import React from 'react';
import "./Auction.css"
const AuctionImage = () => (
    <div className='auction-images'>
        <div className='auction-image'>
            <img width={200}
                src="https://p1.liveauctioneers.com/5584/272301/142777100_1_x.jpg?quality=80&version=1671577913" />
        </div>
        <div className='aution-image'>
            <img
                width={200}
                src="https://p1.liveauctioneers.com/3121/270752/141736207_1_x.jpg?quality=80&version=1669857713"
            />
        </div>
        <div className='aution-image'>
            <img
                width={200}
                src="https://p1.liveauctioneers.com/3121/270752/141736208_1_x.jpg?quality=70&version=1669857713&width=375"
            />
        </div>

    </div>

);

export default AuctionImage;