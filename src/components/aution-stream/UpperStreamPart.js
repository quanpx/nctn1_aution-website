import {Button} from "antd";
import React, {useEffect, useState} from "react";
import BidList from "./BidList";
import StreamVideo from "./StreamVideo";
import {useAuth} from "../../hooks/useAuth";


const UpperStreamPart = ({onNextButton, auctionInfo, source,socket}) => {
    const [curr, setCurr] = useState()
    const {role} = useAuth();
    useEffect(() => {

        getCurrentLot()

    }, [auctionInfo])


    const getCurrentLot = () => {
        const currTmp = auctionInfo.lots.filter(lot => lot.order_in_lot === auctionInfo.current_lot)[0];
        setCurr(currTmp)
    }

    const handleNext = async () => {
      await onNextButton()
    }

    // const fetchNextIndex = async () => {
    //     const {data} = await axios.get(AUCTION_URL+`/next?id=${auction.id}`)
    //     setCurrIdx(data.current_lot)
    //     setNextIdx(data.next_lot)
    // }
    return (
        <>
            <div className="upper-stream-page">
                <div className="stream-video-part">
                    {curr != null ?
                        <div className="item-info-part">
                            <div className="item-image">
                                <img src={curr.image_url}/>
                            </div>
                            <div className="item-description">
                                <p style={{paddingLeft: '15px', paddingRight: '25px'}}>
                                    Join and enjoy all the benefits: its easy and free. Creating an
                                    account allows you to watch all Drouot sales, to leave absentee
                                    bids, to bid online, and to follow all your transactions, to
                                    create alerts and more.
                                </p>
                            </div>
                        </div> : <h2>Loading</h2>}
                    <div className="video-part">
                        {curr != null ? <div className="current-item-state">
                            <p>Status: {auctionInfo.auction.status}</p>
                            <p>Time remaining: 10s</p>
                            <p>Current price: {curr.current_price} $</p>
                        </div> : <h1>Loading</h1>}
                        <div className="video-src">
                            <StreamVideo socket={socket}/>
                        </div>
                    </div>

                </div>
                    {curr != null && <BidList curr={curr} auction={auctionInfo.auction} source={source} socket={socket}/>}


            </div>
            {role === "admin" && <div className="auction-controll">
                <Button type="primary" onClick={handleNext}>Next</Button>
                <Button type="sucessful">Mark Sold</Button>
            </div>}
        </>

    )
}
export default UpperStreamPart;