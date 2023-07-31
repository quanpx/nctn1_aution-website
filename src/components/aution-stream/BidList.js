import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import BidInfo from '../bid/BidInfo';
import "./StreamPage.css";
import axios from "axios";
import { BID_IN_AUCTION, BID_URL } from "../../config/server";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from 'react-redux';
import { updateLatestBid } from '../../hooks/slices/auctionSlice';
import { setBids, setCurrPrice, setDisable, setLatestBid } from '../../hooks/slices/bidSlice';
import { modifyCurrency } from '../../utils/priceUtils';


const BidList = ({ auction, curr, stompClient }) => {
    const [registered, setRegistered] = useState(true)
    const [price, setPrice] = useState()
    // const [bids, setBids] = useState([])
    const [priceStep, setPriceStep] = useState(10)
    const { user, token, role } = useAuth();
    const dispatch = useDispatch()
    const {bids,currPrice,latestBid,disable} = useSelector((state) => state.bid)
    const {currLot} = useSelector((state) => state.auction)
    
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
      
    }, [curr])

    useEffect(()=> {
        resolvePriceStep()
    }, [currPrice])


   
    const fetchBids = async () => {
        try {
            console.log(curr);
            const { data } = await axios.get(BID_IN_AUCTION + `?lotId=${curr.id}`, configs)
            console.log(data)
            if (data.bids.length === 0) {
                setDisable(false)
                //setBids(data.bids)
                dispatch(setBids(data.bids))
            }
            else {
                let latestBid = data.bids[0];
                if (latestBid.owner === user) {
                    dispatch(setDisable(true))
                } else {
                    dispatch(setDisable(false))
                }
                dispatch(setCurrPrice(latestBid.bid_price))
                dispatch(setLatestBid(latestBid))
                dispatch(setBids(data.bids))
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


        } catch (e) {
            console.log(e)
        }

    };
    const resolvePriceStep = () => {
        const currPrice = curr.current_price;
        let step = 0;
        if (currPrice < 1000000) {
            step = 500000;
        } else if (1000000 < currPrice && currPrice < 5000000) {
            step = 1000000;
        } else {
            step = 2000000;
        }
        setPriceStep(step)
    }

    const handleBidWithAutoPrice = async (e) => {
        e.preventDefault()
        console.log("Received values from form: ", price);
        const body = {
            bid_price: currPrice + priceStep,
            lot_id: curr.id,
            auction_id: curr.session
        }
        try {
            const { data } = await axios.post(BID_URL, body, configs)
        } catch (e) {
            console.log(e)
        }

    }
    
    const resolveDisableBidButton = () => {
        if(auction.status !== "start" || disable || currLot.is_sold)
        {
            return true;
        }
        return false;

    }
    return (
        <div className="bid-info-part">
            <div className="list-bids">
                <h4>Thông tin giá đấu</h4>
                {bids.length > 0 ? <div className="bid-info">
                    {bids.map((bid, idx) => <BidInfo key={idx} bid={bid} />)}
                </div> : <span>Hiện tại chưa có giá đặt</span>}
            </div>
            {role != "admin" &&
                <> <span style={{ padding: '10px', fontStyle: 'oblique' }}>Khi phiên đấu giá bắt đầu bạn có thể đặt giá nhiều lần</span>
                    <div className="bid-function">
                        <Button disabled={resolveDisableBidButton()} onClick={handleBidWithAutoPrice} style={!disable ? { width: '100%', marginBottom: '5px', backgroundColor: 'green' }
                            : { width: '100%', marginBottom: '5px', backgroundColor: 'red' }}>
                           Đặt {modifyCurrency(currPrice + priceStep)}</Button><br />
                        <label>Giá: </label>
                        <Input disabled={resolveDisableBidButton()} type='text' onChange={(e) => setPrice(parseInt(e.target.value))} />

                        <Button disabled={resolveDisableBidButton()} style={{ 'float': 'right', 'marginTop': '5px' }} type="primary" onClick={handleBid}>
                            Đặt giá
                        </Button>
                    </div>
                </>
            }
        </div>

    )
}
export default BidList;