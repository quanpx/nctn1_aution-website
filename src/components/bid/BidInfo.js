import React from "react";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";

const BidInfo = ({bid}) => {
    const {user,role} = useAuth();
    const {bid_price,created_at,owner} = bid;
    let date = moment(created_at)
    const resolveMessage = () => {
        if (role === "admin")
        {
            return <p>Had bid with price: <b>{bid_price}$</b>  at {date.format("h:mm:ss A")}</p>
        }
        else 
        {
            if (user === owner)
            {
               return <p>You bid with price: <b>{bid_price}$</b>  at {date.format("h:mm:ss A")}</p>
            }else 
            {
               return <p> Had bid against you with price: <b>{bid_price}$</b>  at {date.format("h:mm:ss A")}</p>
            }
        }
       
    }
    return (
        <div className="bid-info">
           {resolveMessage()}
        </div>
    )
}
export default BidInfo;