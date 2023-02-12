import {Button, Form} from "antd";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useCountdown} from "../../hooks/useCountdown";
import "./LotDetail.css";
import axios from "axios";
import {BID_URL, IS_BID, IS_REGISTERED_AUCTION, LOT_URL} from "../../config/server";
import PriceInput from "./PriceInput";
import {Link} from "react-router-dom";

const LotAction = ({lot}) => {
    const [bid, setBid] = useState();
    const [latestLot,setLatestLot] = useState(lot)
    const {token} = useAuth();
    const startTime = new Date(lot.start_time);
    const [days, hours, minutes, seconds] = useCountdown(startTime);
    const [isRegistered, setIsRegistered] = useState(false);
    const [auctionStatus,setAuctionStatus] = useState(null)
    const [isBidInfo,setIsBidInfo] = useState(null);
    const {is_bid,bid_price} = isBidInfo!=null ? isBidInfo : {is_bid:false,bid_price:0};

    const configs = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await checkRegisteredAuction();
        await checkIsBid()
    }
    const fetchUpdateLot = async () => {
        const {data} = await axios.get(LOT_URL + "/" + lot.id)
        setLatestLot(data)
    }
    const checkRegisteredAuction = async () => {

        const {data} = await axios.get(IS_REGISTERED_AUCTION + `?id=${lot.session}`, configs);
        console.log(data)
        setIsRegistered(data.is_registered)
        setAuctionStatus(data.status)
    }

    const checkIsBid = async () => {
        const {data} = await axios.get(IS_BID + `?lotId=${lot.id}`, configs)
        console.log(data)
        setIsBidInfo(data)
    }
    const onFinish = async (values) => {
        const body = {
            bid_price:values.price.number,
            lot_id:lot.id,
            auction_id:lot.session
        }
        console.log(body)
        try {
            const {data} = await axios.post(BID_URL,body,configs)
            console.log(data)
            await checkIsBid()
            await fetchUpdateLot()
        }catch (e) {
            console.log(e)
        }


    };
    const checkPrice = (_, value) => {
        if (value.number >= lot.current_price) {
            return Promise.resolve();
        }
        return Promise.reject(new Error("Price must be greater or equal current price!"));
    };

    const adviceToBidMessage = () => {
        if(!is_bid && !isRegistered)
        {
           return <span>
                (*)You don't register this auction ! Make a first bid to register
            </span>
        }
        if(isRegistered && !is_bid)
        {
            return <span>You can make a first bid now</span>
        }
        if(is_bid)
        {
           return <span>You set a bid! Please wait until auction start for next bids</span>
        }

    }
    const onAuctionStarted = () => {
        if(auctionStatus === 'start')
        {
            return <p>Go to live: <Link to={generateStreamLink()}>Live</Link></p>
        }else {
            return <span>This auction start after: {days}d {hours}h {minutes}p {seconds}s</span>
        }
    }
    const generateStreamLink = () => {
        return `/auction-stream/${latestLot.session}`
    }

    return (
        <div className="lot-action">
            <div >
                <h1>Some info</h1>
                <h5>
                    {onAuctionStarted()}
                    <p>
                        Has: {latestLot.bid_num!=undefined ? latestLot.bid_num : 0} bids
                    </p>
                </h5>
                <p>
                    {adviceToBidMessage()}
                </p>
            </div>

            <div className="bid-action">
                <hr/>
                <h1>{lot.name}</h1>
                <div>
                    <div className="lot-basic-info">
                        <h3>Estimate {lot.estm_price}</h3>
                        <h3>Initial price: {lot.init_price} $</h3>
                    </div>
                </div>

                <div className="lot-function">
                    <h1>Current price: {lot.current_price} $</h1>

                    <Form
                        name="customized_form_controls"
                        layout="inline"
                        onFinish={onFinish}
                        initialValues={{
                            price: {
                                number: 100,
                                currency: "$",
                            },
                        }}
                    >
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[
                                {
                                    validator: checkPrice,
                                },
                            ]}
                        >
                            <PriceInput price={bid_price} isBid={is_bid}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType={"submit"} disabled={is_bid} >
                                Bid
                            </Button>
                        </Form.Item>
                    </Form>
                    {is_bid &&  <span>You set a bid! Please wait until auction start for next bids</span>}
                </div>

            </div>
        </div>
    );
};
export default LotAction;
