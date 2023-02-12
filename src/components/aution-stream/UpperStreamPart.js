import { Button } from "antd";
import React, { useEffect, useState } from "react";
import BidList from "./BidList";
import StreamVideo from "./StreamVideo";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import axios from "axios";
import { LOT_MARK_AS_SOLD } from "../../config/server";


const UpperStreamPart = ({ onNextButton, auctionInfo, source, socket }) => {
    const [curr, setCurr] = useState()
    const { user, token, role } = useAuth();
    useEffect(() => {

        getCurrentLot()

    }, [auctionInfo])


    const getCurrentLot = () => {
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
                    <p>Time remaining: 10s</p>
                    <p>Current price: {curr.current_price} $</p>
                </>
            }
        }
    }
    return (
        <>
            <div className="upper-stream-page">
                <div className="stream-video-part">
                    {curr != null ?
                        <div className="item-info-part">
                            <div className="item-image">
                                <img src={curr.image_url} />
                            </div>
                            <div className="item-description">
                                <h3 style={{ paddingLeft: '10px' }}>{curr.name}</h3>
                                <p style={{ paddingLeft: '15px', paddingRight: '25px' }}>
                                    {curr.description}
                                </p>
                            </div>
                        </div> : <h2>Loading</h2>}
                    <div className="video-part">
                        {curr != null ? <div className="current-item-state">
                            {resolveCurrentItemState()}
                        </div> : <h1>Loading</h1>}
                        <div className="video-src">
                            <StreamVideo auction={auctionInfo.auction} eventSource={source} socket={socket} />
                        </div>
                    </div>

                </div>
                {curr != null && <BidList curr={curr} auction={auctionInfo.auction} source={source} socket={socket} />}


            </div>
        </>

    )
}
export default UpperStreamPart;