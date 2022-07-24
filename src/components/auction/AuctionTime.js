import React from "react";
import "./Auction.css"
import { useCountdown } from "../../hooks/useCountdown";
import { useSelector } from "react-redux";



const AuctionTime = () =>
{
    const {currentAuction,registerAuctions} = useSelector((state)=>state.auction)

    const startTime = new Date(currentAuction.start_time);
    const [days, hours, minutes, seconds] = useCountdown(startTime);

    const checkRegisteredAuction = (id)=>
    {
        console.log(registerAuctions);
        return registerAuctions.includes(id);
    }
    return (
        <div className="auction-time">
                <h5>LIVE BIDDING STARTS IN:</h5>
                <div className="countdown-time">
                    <div className="auction-time-element">
                        <div className="value">{days}</div>
                        <div className="value-label">DAY</div>
                    </div>
                    <div className="colon">:</div>
                    <div className="auction-time-element">
                        <div className="value">{hours}</div>
                        <div className="value-lalel">HR</div>
                    </div>
                    <div className="colon">:</div>
                    <div className="auction-time-element">
                        <div className="value">{minutes}</div>
                        <div className="value-lalel">MIN</div>
                    </div>
                    <div className="colon">:</div>
                    <div className="auction-time-element">
                        <div className="value">{seconds}</div>
                        <div className="value-lalel">SEC</div>
                    </div>
                </div>
                <div className="auction-time-buttons">
                {checkRegisteredAuction(currentAuction.id)?
                 <button className="auction-time-button-register" >Registered!</button>:
                 <button className="auction-time-button-register" >Register for auction</button>}
                   
                </div>
            </div>
    )
}
export default AuctionTime;