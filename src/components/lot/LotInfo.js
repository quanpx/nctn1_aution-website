import React, { useEffect, useState } from 'react';
import { HeartOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports';


import { Card } from 'antd';
import "./LotItems.css";
import "../auction/Auction.css"
import { useAuth } from '../../hooks/useAuth';
const { Meta } = Card;
const LotInfo = ({ lot }) => {
    const {isAuth} = useAuth();
    const navigate = useNavigate()
    //const bids = useSelector((state) => state.bid)
    const handleLoveItem = (id) => {
        if (!isAuth) {
            navigate("/login")
        }
    }
    const handleBidItem = (id) => {
        if (!isAuth) {
            navigate("/login")
        } else {
            navigate("/lot/" + id)
        }

    }
    const checkBidded = (id) => {
        return false;
    }
    return (
        <div className='w-1/4'>
            <Card
                style={{
                    width: "90%",
                }}
                cover={
                    <img
                        height="150"
                        alt="example"
                        src={lot.image_url}
                    />
                }
                // actions={lot.is_sold &&[
                //     <h4>Sold: {lot.sold_price}$</h4>,]
                // ] : checkBidded(lot.id) ?
                //     [

                //         <HeartOutlined key="ellipsis" onClick={() => handleLoveItem(lot.id)} />,
                //         <MoneyCollectOutlined key="bid" />,

                //     ] : [
                //         <HeartOutlined key="ellipsis" onClick={() => handleLoveItem(lot.id)} />,
                //         <MoneyCollectOutlined key="bid" onClick={() => handleBidItem(lot.id)} />,

                //     ]}
               // }
            >
                <Meta
                    title={<Link to={"/lot/" + lot.id}>{lot.name}</Link>}
                    description={`Est. ${lot.estm_price}`}
                />
                <h3>Curr price: {lot.current_price}</h3>
                {lot.is_sold &&<h4>Sold: {lot.sold_price}$</h4>}
                {checkBidded(lot.id) && <h1>Bidded</h1>}
                {lot.is_next ? <h1 id="next-title">Next</h1>:<h1></h1>}
            </Card>
        </div>
    )
}

export default LotInfo;