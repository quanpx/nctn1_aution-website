import React, { useEffect, useState } from 'react';
import { HeartFilled, HeartOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports';


import { Card, notification } from 'antd';
import "./LotItems.css";
import "../auction/Auction.css"
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { ADD_2_FAVORITE } from '../../config/server';
const { Meta } = Card;
const LotInfo = ({ lot }) => {
    const {isAuth,token} = useAuth();
    const [isLoved, setIsLoved] = useState(lot.is_favorited)
    const navigate = useNavigate()

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }
    //const bids = useSelector((state) => state.bid)
    const handleLoveItem = async (id) => {
        if (!isAuth) {
            navigate("/login")
        }
        let des = isLoved ? "Remove "+lot.name+" from your favorite" : 'Add '+ lot.name+' to your favorite'
        let mess = isLoved ? "Remove from favorite" : "Add to favorite"
        
        
        await axios.get(ADD_2_FAVORITE+lot.id,config)
        .then(res => {
            notification.open({
                message: mess,
                description:des
              });
        })
        .catch(err=> console.log(err))

        setIsLoved(!isLoved)
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
                { !isLoved ? <HeartOutlined  key="ellipsis" onClick={() => handleLoveItem(lot.id)}/>
                : <HeartFilled onClick={() => handleLoveItem(lot.id)} />
            }
            </Card>
        </div>
    )
}

export default LotInfo;