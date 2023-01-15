import {Button, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import BidInfo from '../bid/BidInfo';
import "./StreamPage.css";
import axios from "axios";
import {BID_IN_AUCTION, BID_URL} from "../../config/server";
import {useAuth} from "../../hooks/useAuth";


const NEW_BID = "new-bid"

const BidList = ({auction,curr,source, socket}) => {
    const [registered, setRegistered] = useState(true)
    const [price, setPrice] = useState()
    const [bids, setBids] = useState([])
    const {token,role} = useAuth();
    const configs = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }
    useEffect(() => {

        fetchBids()

        source.addEventListener("bid",  (event) => {
            console.log(event)
            fetchBids()
        })
        socket.on(NEW_BID, ({user, price}) => {
            setBids(bids => [...bids, {user, price}])
        })
    }, [curr])


    const fetchBids = async () => {
        try {
            const { data } = await axios.get(BID_IN_AUCTION+`?lotId=${curr.id}`,configs)
            console.log(data)
            setBids(data.bids)
        }
        catch (error){
            console.log(error)
        }
    }
    const handleBid = async (e) => {
        e.preventDefault()
        console.log("Received values from form: ", price);
        const body = {
            bid_price:price,
            lot_id:curr.id,
            auction_id: curr.session
        }
        console.log(body)
        try {
            const {data} = await axios.post(BID_URL,body,configs)
            console.log(data)
            await fetchBids();
        }catch (e) {
            console.log(e)
        }

    };
    const checkPrice = (_, value) => {
        if (value.number > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error("Price must be greater than zero!"));
    };
    return (
        <div className="bid-info-part">
            <div className="list-bids">
                <h4>Bids for lot</h4>
                {bids.length > 0 ? <div className="bid-info">
                    {bids.map((bid, idx) => <BidInfo key={idx} bid={bid}/>)}
                </div>: <span>No any bids</span>}
            </div>
            {role!="admin" &&
                <> <span style={{padding:'10px',fontStyle:'oblique'}}>When auction starting, you can bid multiple price</span>
                    <div className="bid-function">

                        <label>Price: </label>
                        <Input type='text' onChange={(e) => setPrice(parseInt(e.target.value))}/>
                        <Button style={{'float': 'right', 'marginTop': '5px'}} type="primary" onClick={handleBid}>
                            Bid
                        </Button>
                    </div>
                </>
              }
        </div>

    )
}
export default BidList;