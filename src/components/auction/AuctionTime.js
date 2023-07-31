import React, {useEffect, useState} from "react";
import "./Auction.css"
import { useCountdown } from "../../hooks/useCountdown";
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import axios from "axios";
import {IS_REGISTERED_AUCTION, REGISTER_AUCTION} from "../../config/server";
import {useAuth} from "../../hooks/useAuth";
import { Button, notification } from "antd";



const AuctionTime = ({auction}) => {

    const [isRegistered, setIsRegistered] = useState(false);
    const params = useParams();
    const startTime = new Date(auction.auction.start_time);
    const [days, hours, minutes, seconds] = useCountdown(startTime);
    const {token} = useAuth();


    const configs={
        headers : {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(()=>{
        checkRegisteredAuction();
    },[])
    const checkRegisteredAuction = async () => {

        const {data} = await axios.get(IS_REGISTERED_AUCTION+`?id=${params.id}`,configs);
        setIsRegistered(data.is_registered)
    }
    const handleRegister = async () => {
        try {
            const {data} = await axios.get(REGISTER_AUCTION+`?id=${params.id}`,configs)
            
            await checkRegisteredAuction();

            notification.success({
                message: `Tin nhắn`,
                description:`Bạn đã đăng ký phiên đấu giá. Chúng tôi đã gửi email để xác nhận đăng ký của bạn.`
            });

        }catch (error)
        {
            console.log(error)
        }
    }
    return (
        <div className="auction-time">
            <h5>Phiên đấu giá bắt đấu sau:</h5>
            <div className="countdown-time">
                <div className="auction-time-element">
                    <div className="value">{days}</div>
                    <div className="value-label">Ngày</div>
                </div>
                <div className="colon">:</div>
                <div className="auction-time-element">
                    <div className="value">{hours}</div>
                    <div className="value-lalel">Giờ</div>
                </div>
                <div className="colon">:</div>
                <div className="auction-time-element">
                    <div className="value">{minutes}</div>
                    <div className="value-lalel">Phút</div>
                </div>
                <div className="colon">:</div>
                <div className="auction-time-element">
                    <div className="value">{seconds}</div>
                    <div className="value-lalel">Giây</div>
                </div>
            </div>
            <div className="mt-2">
                {isRegistered ?
                    <Button className="auction-time-button-register text-xl p-4 text-green-800" disabled={isRegistered}>Đã đăng ký</Button> :
                    <Button type="primary" onClick={handleRegister}>Đăng ký phiên đấu giá</Button>}

            </div>
        </div>
    )
}
export default AuctionTime;