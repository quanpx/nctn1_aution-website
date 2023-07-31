import React from 'react';
import "./Auction.css"
import { useSelector } from 'react-redux';
import moment from 'moment';
import "moment/locale/vi";
import { Button } from 'antd';

const AuctionName = ({ auction }) => {
    const data = auction.auction;
    const newWindowStream = () => {
        var url =
        window.open("https://google.com", '_blank', 'location=yes,height=1000,width=980,scrollbars=yes,status=yes')
    }
    const generateLinkStream = () => {
        if (data.status == 'start') {
            return <div>
                <p className='text-sm'> <b>Phiên đấu giá đã bắt đầu bạn có thể tham gia ngay</b> <br /></p>
                 <Button type='primary' onClick={(e) => { e.preventDefault() ; window.open( `/auction-stream/${data.id}`, '_blank', 'location=yes,height=800,width=900,scrollbars=yes,status=yes')}}>
                Tham gia ngay
            </Button>
            </div>
            
        } else if (data.status == 'end') {
            return <h2 className='text-red-800'>Phiên đấu giá đã két thúc.</h2>
        }
    }
    return (
        <div className='basis-2/3'>
           
    
            <p>Phiên đấu giá được diễn ra lúc: <b><i>{moment(data.start_time).format("LLLL")}</i></b></p>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            {generateLinkStream()}
        </div>
    )
}
export default AuctionName;