import "./Auction.css"
import { useCountdown } from "../../hooks/useCountdown";

const startTime = new Date("2022-06-16T12:00:00Z");

const AuctionTime = () =>
{
    const [days, hours, minutes, seconds] = useCountdown(startTime);
    
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
                    <button className="auction-time-button-register" >REGISTER FOR AUCTION</button>
                    <button className="auction-time-button-register" >ADD TO CALENDAR</button>
                </div>
            </div>
    )
}
export default AuctionTime;