import React, { useEffect, useState } from 'react';
import { HeartFilled, HeartOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports';


import { Card, Tooltip, notification } from 'antd';
import "./LotItems.css";
import "../auction/Auction.css"
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { ADD_2_FAVORITE } from '../../config/server';
const { Meta } = Card;
const LotInfo = ({ lot }) => {
    const { isAuth, token } = useAuth();
    const [isLoved, setIsLoved] = useState(false)
    const navigate = useNavigate()

    useEffect(() => setIsLoved(lot.is_favorited), [lot])
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
        let des = isLoved ? "Bạn đã xóa " + lot.name + " khỏi danh sách yêu thích" : 'Bạn đã thêm ' + lot.name + ' vào danh sách yêu thích'
        let mess = isLoved ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"


        await axios.get(ADD_2_FAVORITE + lot.id, config)
            .then(res => {
                notification.open({
                    message: mess,
                    description: des
                });
            })
            .catch(err => console.log(err))

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
        <div className='w-5/12 p-7'>
            <Card
                className='flex flex-col'
                cover={
                    <img
                        height="150"
                        alt="example"
                        src={lot.image_url}
                    />
                }

            >
                <Meta

                    title={<Link className='text-sm' to={"/lot/" + lot.id}>{lot.name}</Link>}
                    description={`Ước tính: ${lot.estm_price}`}

                />
                <span>Giá khởi điểm: {lot.init_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                {lot.is_sold && <h4>Đã bán: {lot.sold_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h4>}
                {checkBidded(lot.id) && <h1>lượt đặt giá</h1>}
                {lot.is_next ? <h1 id="next-title">Tiếp theo</h1> : <h1></h1>}
                <div className='justify-self-center'>
                    {!isLoved ?
                        <Tooltip placement="top" title={"Thêm vào mục yêu thích"}>
                            <HeartOutlined key="ellipsis" twoToneColor="#eb2f96" className='text-2xl' onClick={() => handleLoveItem(lot.id)} />
                        </Tooltip>
                        : <Tooltip placement="top" title={"Xóa khỏi mục yêu thích"}>
                            <HeartFilled width={50} height={50} onClick={() => handleLoveItem(lot.id)} />
                        </Tooltip>

                    }
                </div>

            </Card>
        </div>
    )
}

export default LotInfo;