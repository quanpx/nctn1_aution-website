import { Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCountdown } from "../../hooks/useCountdown";
import "./LotDetail.css";
import axios from "axios";
import { BID_URL, IS_BID, IS_REGISTERED_AUCTION, LOT_URL } from "../../config/server";
import PriceInput from "./PriceInput";
import { Link } from "react-router-dom";
import { WifiOutlined } from "@ant-design/icons";

const LotAction = ({ lot }) => {
    const [bid, setBid] = useState();
    const [latestLot, setLatestLot] = useState(lot)
    const { token } = useAuth();
    const startTime = new Date(lot.start_time);
    const [days, hours, minutes, seconds] = useCountdown(startTime);
    const [isRegistered, setIsRegistered] = useState(false);
    const [auctionStatus, setAuctionStatus] = useState(null)
    const [isBidInfo, setIsBidInfo] = useState(null);
    const { is_bid, bid_price } = isBidInfo != null ? isBidInfo : { is_bid: false, bid_price: 0 };
   
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
        const { data } = await axios.get(LOT_URL + "/" + lot.id)
        setLatestLot(data)
    }
    const checkRegisteredAuction = async () => {

        const { data } = await axios.get(IS_REGISTERED_AUCTION + `?id=${lot.session}`, configs);
        console.log(data)
        setIsRegistered(data.is_registered)
        setAuctionStatus(data.status)
    }

    const checkIsBid = async () => {
        const { data } = await axios.get(IS_BID + `?lotId=${lot.id}`, configs)
        console.log(data)
        setIsBidInfo(data)
    }
    const onFinish = async (values) => {
        const body = {
            bid_price: values.price.number,
            lot_id: lot.id,
            auction_id: lot.session
        }
        console.log(body)
        try {
            const { data } = await axios.post(BID_URL, body, configs)
            console.log(data)
            await checkIsBid()
            await fetchUpdateLot()
        } catch (e) {
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
        if (!is_bid && !isRegistered) {
            return <span>
                (*) Bạn chưa đăng ký phiên đấu giá này. Bạn có thể đặt giá đấu, hệ thống tự động đăng ký.
            </span>
        }
        if (isRegistered && !is_bid) {
            return <span>Bạn có thể bỏ giá đấu.</span>
        }
        if (is_bid) {
            return <span>Bạn đã đặt giá và đăng ký phiên đấu giá. Xin vui lòng đợi khi phiên đấu giá bắt đầu.</span>
        }

    }
    const onAuctionStarted = () => {
        if (auctionStatus === 'start') {
            return <p><b>Tham gia phiên đấu giá: </b> <br /> <Link className="text-red-500 text-xl" to={generateStreamLink()}>Đang trực tiếp <WifiOutlined /></Link></p>
        } else {
            return <span>Phiên đấu giá bắt đầu sau: {days}d {hours}h {minutes}p {seconds}s</span>
        }
    }
    const generateStreamLink = () => {
        return `/auction-stream/${latestLot.session}`
    }

    const bidMessage = () => {
        if (lot.is_sold) {
            return <span className="text-red-600"> Sản phẩm đã được bán.</span>
        } else {
            if (is_bid) {
                return <span>Bạn đã đặt giá đấu. Xin vui lòng đợi khi phiên đấu giá bắt đầu.</span>
            }
        }
    }
    return (
        <div className="px-4 ">
            <div className="pb-3" >
                <h1 className="text-xl">Thông tin sản phẩm</h1>
                <>
                    {onAuctionStarted()}
                    <p>
                        <b>Lượt bỏ giá: </b> {latestLot.bid_num != undefined ? latestLot.bid_num : 0} lượt bỏ giá
                    </p>
                </>
                <p>
                    {adviceToBidMessage()}
                </p>
                <Link className="text-xl" to={`../auction/${lot.session}`} >Xem thêm các sản phẩm trong phiên đấu giá</Link>
            </div>

            <div className="pt-4 border-b-4 border-t-4 p-2 flex flex-row justify-between">


                <div >
                    <h1>{lot.name}</h1>
                    <p><b>Ước tính: </b> {lot.estm_price}</p>
                    <p><b>Giá khởi điểm:</b> {lot.init_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </p>
                    <p><b>Giá hiện tại:</b> {lot.current_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </p>

                   
                </div>

                <div>
                    <Form
                        name="customized_form_controls"
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            price: {
                                number: 100,
                                currency: "VND",
                            },
                        }}
                    >
                        <Form.Item
                            name="price"
                            label={<b>{`Giá bắt đầu (${lot.init_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })})`}</b>}
                            rules={[
                                {
                                    validator: checkPrice,
                                },
                            ]}
                        >
                            <PriceInput price={bid_price} isBid={is_bid || lot.is_sold} />
                        </Form.Item>
                        <Form.Item wrapperCol={30}>
                            <Button type="primary" htmlType={"submit"} disabled={is_bid || lot.is_sold} >
                                Đặt giá
                            </Button>
                        </Form.Item>
                    </Form>
                    {bidMessage()}

                </div>

            </div>
        </div>
    );
};
export default LotAction;
