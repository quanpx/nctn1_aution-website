import { Button, Form, Input, InputNumber, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import React, { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCountdown } from "../../hooks/useCountdown";
import "./LotDetail.css"
import axios from 'axios';
import { ROOT_API } from "../../config/server";
import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addBid } from "../../feature/bidSlice";
import { addRegisterAuction } from "../../feature/auctionSlice";
import PriceInput from "./PriceInput";
import { Navigate, useNavigate } from "react-router-dom";
const LotAction = ({ lot }) => {
    const [bid, setBid] = useState();
    const [user, token, isAuth] = useAuth();
    const bids = useSelector((state)=>state.bid)
    const { registerAuctions } = useSelector((state) => state.auction)
    const startTime = new Date(lot.start_time);
    const [days, hours, minutes, seconds] = useCountdown(startTime);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkRegisteredAuction = (id) => {
        return registerAuctions.includes(id);
    }
    const checkBidded= (id)=>{
        console.log(bids);
        return bids.includes(id);
    }
    const onFinish = async ({price}) => {
        if(checkBidded(lot.id))
        {
            notification.open({
                message: 'Bid warning',
                description:
                    'You have bided this lot! Wait until this auction start for next bid!',
                icon: <CheckOutlined />,
            });
            return;
        }
        console.log('Received values from form: ', price);
        let url = ROOT_API + "bid";
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        }

        let body = {
            lot_id: lot.id,
            bid_price: price.number,
            auction_id: lot.session

        }
        console.log(body);
        await axios.post(url, body, { headers })
            .then(res => {

                dispatch(addBid({ id: body.lot_id }))
                if (!checkRegisteredAuction(body.auction_id)) {
                    dispatch(addRegisterAuction({ id: body.auction_id }))
                }
                notification.open({
                    message: 'Bid Success',
                    description:
                        'Bid lot ' + lot.name + " Success",
                    icon: <CheckOutlined />,
                });


            })
            .catch(error => {
                notification.open({
                    message: 'Bid error',
                    description:
                        'Bid lot ' + lot.name + " got error: " + error,
                    icon: <ExclamationCircleOutlined />,
                });
            })

    };

    const checkPrice = (_, value) => {
        if(!isAuth)
        {
            navigate("/login")
        }
        if (value.number > 0) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('Price must be greater than zero!'));
    };
    return (
        <div className="lot-action">
            <h1>{lot.name}</h1>
            <div>
                <div className="lot-basic-info">
                    <h5>Estimate {lot.estm_price}</h5>
                    <h5>{days}d {hours}h {minutes}p {seconds}s </h5>
                </div>
            </div>

            <div className="lot-function">
                <h1>Current price: {lot.current_price}</h1>
                <Form
                    name="customized_form_controls"
                    layout="inline"
                    onFinish={onFinish}
                    initialValues={{
                        price: {
                            number: 0,
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
                        <PriceInput />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Bid
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}
export default LotAction;