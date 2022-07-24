import { Button, Form, Input, InputNumber, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import React, { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCountdown } from "../../hooks/useCountdown";
import "./LotDetail.css"
import axios from 'axios';
import { ROOT_API } from "../../config/server";
import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import { addBid } from "../../feature/bidSlice";
import { addRegisterAuction } from "../../feature/auctionSlice";
const LotAction= ({lot}) =>
{   
    const [bid,setBid]=useState();
    const [user,token,isAuth]=useAuth();
    const { registerAuctions } = useSelector((state)=>state.auction)
    const startTime = new Date(lot.start_time);
    const [days, hours, minutes, seconds] = useCountdown(startTime);
    const dispatch = useDispatch();
    
    const checkRegisteredAuction = (id) =>
    {
        return registerAuctions.includes(id);
    }
    const handleClick =async ()=>
    {
        let url = ROOT_API+"bid";
        const headers = {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
            "Acept":"application/json"
        }

        let body = {
            lot_id:lot.id,
            bid_price:bid,
            auction_id:lot.session

        }
        await axios.post(url,body,{headers})
        .then(res=>{

            dispatch(addBid({id:body.lot_id}))
            if(!checkRegisteredAuction(body.auction_id))
            {
                dispatch(addRegisterAuction({id:body.auction_id}))
            }
            notification.open({
                message: 'Bid Success',
                description:
                  'Bid lot '+lot.name+" Success",
                icon: <CheckOutlined />,
              });


        })
        .catch(error=>{
            notification.open({
                message: 'Bid error',
                description:
                  'Bid lot '+lot.name+" got error: "+error,
                icon: <ExclamationCircleOutlined />,
              });
        })

      
    }
    return (
        <div className="lot-action">
           <h1>{lot.name}</h1>
            <div>
                <div className="lot-basic-info">
                <h5>Estimate {lot.estm_price}</h5>
                <h5>{days}d {hours}h {minutes}p {seconds}s </h5>
                </div>
            </div>

            <div className="lot-function">
                <h1>Current price: {lot.current_price}</h1>
                <label>Your bid</label>
               
                <input type={"number"} onChange={(e)=>{
                    setBid(e.target.value)
                }}/>
                <button onClick={handleClick}>Bid</button>
            </div>
        </div>
    )
}
export default LotAction;