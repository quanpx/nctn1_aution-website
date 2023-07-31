import React from "react";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";
import { modifyCurrency } from "../../utils/priceUtils";

const BidInfo = ({bid}) => {
    const {user,role} = useAuth();
    const {bid_price,created_at,owner} = bid;
    
    const resolveMessage = () => {
        if (role === "admin")
        {
            return <p>Có người đặt: <b>{modifyCurrency(bid_price)} </b> </p>
        }
        else 
        {
            if (user === owner)
            {
               return <p>Bạn đặt: <b>{modifyCurrency(bid_price)}</b></p>
            }else 
            {
               return <p> Có người đặt: <b>{modifyCurrency(bid_price)}</b></p>
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