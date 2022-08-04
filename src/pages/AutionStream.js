import { Button, Card, Form, notification } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BidList from '../components/aution-stream/BidList';
import StreamImage from '../components/aution-stream/StreamImage';

import { SSE_SUBSCRIBE_API } from '../config/server';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios'
import { ROOT_API } from '../config/server';

import "./AuctionStream.css"
import LotItems from '../components/lot/LotItems';
import PriceInput from './lot/PriceInput';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { current } from '@reduxjs/toolkit';
import { addBid } from '../feature/bidSlice';

const AuctionStream = () => {
    const params = useParams();
    const [user, token, isAuth] = useAuth();
    const [eventSource, setEventSource] = useState(null);
    const [lots, setLots] = useState([]);
    const [currentLot, setCurrentLot] = useState();
    const [bids, setBids] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(null);
    const { registerAuctions } = useSelector((state) => state.auction)
    const [registered, setRegistered] = useState(false)
    const dispatch = useDispatch()

    // eventSource.onopen((event)=>{
    //     console.log("Connect to server :"+event.name);
    // })
    useEffect(() => {
        let eventSource = new EventSource(SSE_SUBSCRIBE_API);
        eventSource.addEventListener("haveBid", (event) => {
            setEventSource(eventSource)
            let data = JSON.parse(event.data);
            console.log(data);
            console.log(bids);
            setBids((oldBids)=>[...oldBids,data.message]);
            setCurrentPrice(data.current_price)
          

        })
    }, [bids,currentPrice]);
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        console.log(lots);
        setCurrentLot(lots.at(2))

    }, [lots])

    useEffect(() => {
        checkRegistered() ? setRegistered(true) : setRegistered(false)
    }, [])

    const fetchData = async () => {
        await axios.get(ROOT_API + "auction/" + params.id)
            .then(res => res.data)
            .then(data => {
                setLots(data.lots);
            })
            .catch(e => console.log(e))
    }



    const checkRegistered = () => {
        return registerAuctions.includes(params.id);
    }

    const onFinish = async ({ price }) => {
        console.log('Received values from form: ', price);
        let url = ROOT_API + "bid";
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }

        let body = {
            lot_id: currentLot.id,
            bid_price: price.number,
            auction_id: currentLot.session

        }
        console.log(body);
        await axios.post(url, body, { headers })
            .then(res => {

                dispatch(addBid({ id: currentLot.id }))
                notification.open({
                    message: 'Bid Success',
                    description:
                        'Bid lot ' + currentLot.name + " Success",
                    icon: <CheckOutlined />,
                });


            })
            .catch(error => {
                notification.open({
                    message: 'Bid error',
                    description:
                        'Bid lot ' + currentLot.name + " got error: " + error,
                    icon: <ExclamationCircleOutlined />,
                });
            })

    };

    const checkPrice = (_, value) => {
        if (value.number > 0) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('Price must be greater than zero!'));
    };
    return (
        <>
            <div className='auction-stream'>
                <div className="stream-video">
                    <div className="video">
                        <iframe width={500} height={300} src="https://youtube.com/embed/vS1j7VJ4DLc" />
                    </div>
                    <div style={{ display: 'flex',justifyContent:'space-between' }}>
                        {currentPrice && <div className='current-info'>
                            <h3>Current price:    {currentPrice}</h3>
                        </div>}
                        {registered ?
                            <Form
                                name="customized_form_controls"
                                className='input-price'
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
                            </Form> : <div className="register-button">
                                <Link to={"/auction/register"}>Register to sale</Link>
                            </div>

                        }
                        
                    </div>
                    {eventSource && currentLot && <BidList event={eventSource} lot={currentLot} bids={bids} />}
                </div>
                
                {currentLot && <div>
                    <Card
                        style={{
                            width: 500,
                        }}
                        cover={
                            <img
                                height={200}
                                alt="example"
                                src={currentLot.image_url}
                            />
                        }
                    >
                        <Meta
                            title={currentLot.name}
                            description={currentLot.description}
                        />
                    </Card>
                </div>}
            </div>

            <div className='related-lot'>
                {lots.length != 0 && <LotItems lots={lots} />}
            </div>
        </>

    )
}



export default AuctionStream;