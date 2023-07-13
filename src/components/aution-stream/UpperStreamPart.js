import { Button } from "antd";
import React, { useEffect, useState } from "react";
import BidList from "./BidList";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import axios from "axios";
import { LOT_MARK_AS_SOLD } from "../../config/server";
import HandleStream from "./HanldeStream";


const UpperStreamPart = ({ onNextButton, auctionInfo, source }) => {
    const [curr, setCurr] = useState()
    const { user, token, role } = useAuth();
    useEffect(() => {

        getCurrentLot()

    }, [auctionInfo])


    const getCurrentLot = () => {
        console.log(auctionInfo);
        const currTmp = auctionInfo.lots.filter(lot => lot.order_in_lot === auctionInfo.current_lot)[0];
        setCurr(currTmp)
    }

    const resolveCurrentItemState = () => {
        if (curr != null) {
            if (auctionInfo.auction.status === "end") {
                return <>
                    <p>Status: {auctionInfo.auction.status}</p>
                    <p>Sold price: {curr.current_price} $</p>
                </>
            } else {
                return <>
                    <p>Status: {auctionInfo.auction.status}</p> 
                    <p>Current price: {curr.current_price} $</p>
                </>
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
    // const resolveStreamFunction = () => {
    //     if (role === "admin") {
    //         console.log(startable);
    //         return <>
    //             <Button type="" onClick={handleStart} disabled={!startable || auction.status ==='end'}>Start Stream</Button>
    //             <Button type="" onClick={handleEnd} disabled={!startable || auction.status ==='end'}>End Stream</Button>
    //         </>
    //     } else if (role === "user") {
    //         if (status === 'start') {
    //             return <>
    //                 <h3><i>The auction has started. You can join now!</i></h3>
    //                  <Button type="" onClick={handleJoin} disabled={isJoined}>{isJoined ? 'Joined' : 'join Stream'}</Button>
    //             </>
    //         }else if(status === 'end')
    //         {
    //             return <h3><i>The auction finished! Waiting for next auction!</i></h3>
    //         }
    //          else {
    //             return <h3><i>The auction is not started! Waiting for auction start</i></h3>
    //         }
    //     }
    // }
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
                {curr != null ? <div className="flex flex-row">
                    <div className="basis-2/3 border-r-4 justify-self-center self-center">
                        <div className="item-image border-b-4 p-3 ">
                            <img className="m-auto" width={350} src={curr.image_url} />
                        </div>
                        <div className="item-description">
                            <h3 style={{ paddingLeft: '10px' }}>{curr.name}</h3>
                            <p style={{ paddingLeft: '15px', paddingRight: '25px' }}>
                                {curr.description}
                            </p>
                        </div>
                    </div>
                    <div className="video-part basis-1/3">
                        <div className="current-item-state">
                            {resolveCurrentItemState()}
                        </div>
                        <div className="video-src">
                            <HandleStream auction={auctionInfo.auction} eventSource={source} />
                        </div>
                    </div>

                </div>: renderWaitingPart()}
                {curr != null && <BidList curr={curr} auction={auctionInfo.auction} source={source} />}


            </div>
        </>

    )
}
export default UpperStreamPart;