import { useState } from "react";
import "./StreamPage.css";

const BidList = () => {
    const [registered, setRegistered] = useState(true)
    const bidList = ["In room 100$", "In room 200$", "In room 300$"]
    return (
        <div className="bid-list" style={{ float: 'right' }}>
            <div className="bid-info">
                <h4>Bids for lot</h4>
                {bidList.map((bid, idx) => (<h3 key={idx}>{bid}</h3>))}
            </div>
            {registered&&
                <div className="bid-set">
                    <input type={"number"} />
                    <input type={"button"} value="Bid"/>
                </div>
            }
        </div>
    )
}
export default BidList;