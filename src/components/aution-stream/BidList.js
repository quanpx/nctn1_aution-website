import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import BidInfo from '../bid/BidInfo';
import "./StreamPage.css";
import axios from "axios";
import { BID_IN_AUCTION, BID_URL } from "../../config/server";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from 'react-redux';
import { updateLatestBid } from '../../hooks/slices/auctionSlice';


const NEW_BID = "new-bid"

const BidList = ({ auction, curr, source, socket }) => {
    const [registered, setRegistered] = useState(true)
    const [price, setPrice] = useState()
    const [bids, setBids] = useState([])
    const [priceStep, setPriceStep] = useState(10)
    const [disableBidButton, setDisable] = useState(true)
    const { user, token, role } = useAuth();

    const dispatch = useDispatch()

    const configs = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }
    useEffect(() => {

        fetchBids()
        resolvePriceStep()
        // source.addEventListener("bid", (event) => {
        //     console.log(event)
        //     fetchBids()

        // })

        // source.addEventListener("reload-bids",(event)=> {
        //     console.log(event);
        //     fetchBids()
        // })
    }, [curr])


    const fetchBids = async () => {
        try {
            console.log(curr);
            const { data } = await axios.get(BID_IN_AUCTION + `?lotId=${curr.id}`, configs)
            console.log(data)
            if (data.bids.length === 0) {
                setDisable(false)
                setBids(data.bids)
            }
            else {
                let latestBid = data.bids[0];
                if (latestBid.owner === user) {
                    setDisable(true)
                } else {
                    setDisable(false)
                }
                dispatch(updateLatestBid(latestBid))
                setBids(data.bids)
            }

        }
        catch (error) {
            console.log(error)
        }
    }
    const handleBid = async (e) => {
        e.preventDefault()
        console.log("Received values from form: ", price);
        const body = {
            bid_price: price,
            lot_id: curr.id,
            auction_id: curr.session
        }
        try {
            const { data } = await axios.post(BID_URL, body, configs)
            await fetchBids();

        } catch (e) {
            console.log(e)
        }

    };
    const resolvePriceStep = () => {
        const currPrice = curr.current_price;
        let step = 0;
        if (currPrice < 100) {
            step = 10;
        } else if (100 < currPrice && currPrice < 500) {
            step = 50;
        } else {
            step = 100;
        }
        setPriceStep(step)
    }

    const handleBidWithAutoPrice = async (e) => {
        e.preventDefault()
        console.log("Received values from form: ", price);
        const body = {
            bid_price: curr.current_price + priceStep,
            lot_id: curr.id,
            auction_id: curr.session
        }
        try {
            const { data } = await axios.post(BID_URL, body, configs)
            await fetchBids();

        } catch (e) {
            console.log(e)
        }

    }

    const resolveDisableBidButton = () => {
        if(auction.status !== "start" || disableBidButton)
        {
            return true;
        }
        return false;

    }
    return (
        <div className="bid-info-part">
            <div className="list-bids">
                <h4>Bids for lot</h4>
                {bids.length > 0 ? <div className="bid-info">
                    {bids.map((bid, idx) => <BidInfo key={idx} bid={bid} />)}
                </div> : <span>No any bids</span>}
            </div>
            {role != "admin" &&
                <> <span style={{ padding: '10px', fontStyle: 'oblique' }}>When auction starting, you can bid multiple price</span>
                    <div className="bid-function">
                        <Button disabled={resolveDisableBidButton()} onClick={handleBidWithAutoPrice} style={!disableBidButton ? { width: '100%', marginBottom: '5px', backgroundColor: 'green' }
                            : { width: '100%', marginBottom: '5px', backgroundColor: 'red' }}>
                            {curr.current_price + priceStep} $ Bid</Button><br />
                        <label>Price: </label>
                        <Input disabled={resolveDisableBidButton()} type='text' onChange={(e) => setPrice(parseInt(e.target.value))} />

                        <Button disabled={resolveDisableBidButton()} style={{ 'float': 'right', 'marginTop': '5px' }} type="primary" onClick={handleBid}>
                            Bid
                        </Button>
                    </div>
                </>
            }
        </div>

    )
}
export default BidList;