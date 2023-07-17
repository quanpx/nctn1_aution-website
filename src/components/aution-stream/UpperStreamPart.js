import { Button } from "antd";
import React, { useEffect, useState } from "react";
import BidList from "./BidList";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOT_MARK_AS_SOLD } from "../../config/server";
import HandleStream from "./HanldeStream";
import { EyeOutlined } from "@ant-design/icons";
import { setCurrLot } from "../../hooks/slices/auctionSlice";


const UpperStreamPart = ({onNextButton, auctionInfo, stompClient }) => {
    const { user, token, role } = useAuth();
    const dispatch = useDispatch()
    const {currPrice} = useSelector((state => state.bid))
    const {currLot,numUsers} = useSelector(state => state.auction)
    useEffect(() => {
        getCurrentLot()
        

    }, [auctionInfo])


    const getCurrentLot = () => {
        console.log(auctionInfo);
        const currTmp = auctionInfo.lots.filter(lot => lot.order_in_lot === auctionInfo.current_lot)[0];
        dispatch(setCurrLot(currTmp))
    }

    const resolveCurrentItemState = () => {
        if (currLot != null) {
            if (auctionInfo.auction.status === "end") {
                return <div>
                    {numUsers} <EyeOutlined />
                    <p>Status: {auctionInfo.auction.status}</p>
                    <p>Sold price: {currLot.current_price} $</p>
                </div>
            } else {
                return <div>
                 Đang xem: {numUsers} <EyeOutlined />
                    <p>Status: {auctionInfo.auction.status}</p> 
                    <p>Current price: {currPrice} $</p>
                </div>
            }
        }
    }
    const differentTime = (auction) => {
        var now = new Date();
        var time = new Date(auction.start_time);
        var diffMs = (time - now); // milliseconds between now & Christmas

        var diffDays = diffMs >= 0 ? Math.floor(diffMs / 86400000) : 0; // days
        var diffHrs = diffMs >= 0 ? Math.floor((diffMs % 86400000) / 3600000) : 0; // hours
        var diffMins = diffMs >= 0 ? Math.round(((diffMs % 86400000) % 3600000) / 60000) : 0; // minutes

        return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes left";

    }

    const renderWaitingPart = () => {
        return <div>
            <div className="border-b-4 p-3 pl-10 ">
                <img className="m-auto" width={500} src={auctionInfo.auction.image_url} />
            </div>
            
            <div className="">
                <h3 style={{ paddingLeft: '10px' }}>{auctionInfo.auction.name}</h3>
                <p style={{ paddingLeft: '15px', paddingRight: '25px' }}>
                    {auctionInfo.auction.description}
                </p>
                <h1 className="text-red-500">The auction has not been started. Please comeback soon!</h1>
                <h1 className="text-red-500">The auction will be started in {differentTime(auctionInfo.auction)}</h1>
               
            </div>
        </div>
    }
    return (
        <>
            <div className="upper-stream-page">
                {currLot != null ? <div className="flex flex-row">
                    
                    <div className="basis-2/3 border-r-4 justify-self-center self-center">
                        <div className="item-image border-b-4 p-3 ">
                            
                            <img className="m-auto" width={350} src={currLot.image_url} />
                        </div>
                        <div className="item-description">
                            <h3 style={{ paddingLeft: '10px' }}>{currLot.name}</h3>
                            <p style={{ paddingLeft: '15px', paddingRight: '25px' }}>
                                {currLot.description}
                            </p>
                        </div>
                    </div>
                    <div className="video-part basis-1/3">
                        <div className="current-item-state">
                            {resolveCurrentItemState()}
                        </div>
                    </div>

                </div>: renderWaitingPart()}
                {currLot != null && <BidList curr={currLot} auction={auctionInfo.auction} stompClient={stompClient} />}


            </div>
        </>

    )
}
export default UpperStreamPart;