import React, { useEffect, useState } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { Button, Card, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./Auction.css";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { AUCTION_URL, REGISTERED_AUCTION, REGISTER_AUCTION } from "../../config/server";
const { Meta } = Card;

const AuctionItem = ({ auction }) => {
    const navigate = useNavigate();
    const { token,isAuth,role } = useAuth();
    console.log(auction.is_registed);
    const [isRegistered,setIsRegistered] = useState(auction.is_registed)
    console.log(isRegistered);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        },
        params: {
            id: auction.id
        }

    }

   
    const handleClick = () => {
        navigate("/auction/" + auction.id);
    };
    
    const handleRegisterAuction = async () => {
        try {
            const { data } = await axios.get(REGISTER_AUCTION, config)
            notification.open({
                message: 'Register auction successfully!',
                description: 'Thank you for your interested in our auction'
            })
            setIsRegistered(true)
        } catch (error) {
            console.log(error);
        }


    }
    const renderFunction = () => {
       
            return <>
            <Button disabled={isRegistered} type={'primary'} onClick={handleRegisterAuction}>
                   <span className="text-base font-bold"> {!isRegistered ? 'Register this auction' :'You\'ve registed auction'}</span>
                </Button>
                <p className="text-sm py-1">Registrations until <b>{moment(auction.start_time).format('LLL')}</b></p>
            </>
    }
    return (
        <div className="flex flex-row justify-start p-2 ml-5 mr-4 bg-slate-200">
            <div className="basis-1/4">
                <img width={150} src={auction.image_url} />
            </div>
            <div className="basis-1/2">
                <a href={`/auction/${auction.id}`}>
                    <h1>{moment(auction.start_time).format('LLL')}</h1>
                    <h3>{auction.name}</h3>
                </a>

                <p>{auction.num_item} lots</p>
                <p>{auction.register_num} people registed</p>
                <span>Status: <em className="text-base text-red-600">{auction.status}</em></span>
            </div>
            <div className="basis-1/4 self-end">
                {renderFunction()}
            </div>
        </div>
    );
};
export default AuctionItem;
