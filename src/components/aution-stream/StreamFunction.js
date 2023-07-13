import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LOT_MARK_AS_SOLD } from "../../config/server";
import { useAuth } from "../../hooks/useAuth";

const StreamFunction = ({onNextButton,auctionInfo}) => {
    const { role,token } = useAuth();
    const [curr, setCurr] = useState()
    const [disable, setDisable] = useState(false)
    const latestBid = useSelector(state => state.auction.data)
    const configs = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }
    useEffect(() => {

        getCurrentLot()

    }, [auctionInfo])

    const getCurrentLot = () => {
        const currTmp = auctionInfo.lots.filter(lot => lot.order_in_lot === auctionInfo.current_lot)[0];
        setCurr(currTmp)
        setDisable(false)
    }
    const resolveStreamFunction = () => {
        if (role === "admin") {
            if(curr!=null)
            {
                return <>
                <Button type="primary" onClick={onNextButton}>Next</Button>
                <Button disabled={disable} type="sucessful" onClick={markAsSold}>{curr.is_sold ? 'Sold' : 'Mark as Sold'}</Button>
                </>
            }
           
            
        }
    }
    const markAsSold = async () => {
        const body = {
            user: latestBid.owner,
            bid_price: latestBid.bid_price,
            lot_id: latestBid.lot_id,
            bid_id: latestBid.id
        }

        try {
            const { data } = await axios.post(LOT_MARK_AS_SOLD, body, configs)
            setDisable(true)
        } catch (e) {
            console.log(e);
        }

    }
    return (
        <div className="stream-function">
            {resolveStreamFunction()}

        </div>)
}

export default StreamFunction;