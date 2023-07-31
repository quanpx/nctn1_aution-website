import React, { useEffect, useRef, useState } from "react";
import LotList from "./LotList";
import "./AuctionStream.css"
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AUCTION_URL, BID_IN_AUCTION, JOIN_AUCTION, WEB_SOCKET } from "../../config/server";
import UpperStreamPart from "./UpperStreamPart";
import { io } from "socket.io-client";
import { Button, Modal, Skeleton, notification } from "antd";
import { useAuth } from "../../hooks/useAuth";
import StreamFunction from "./StreamFunction";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import BeforeStream from "./BeforeStream";
import Popup from "../base-component/Popup";
import "../base-component/base.css";
import Loading from "../base-component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setBids, setCurrPrice, setDisable, setLatestBid } from "../../hooks/slices/bidSlice";
import { setCurrLot, setDisableSoldButton, setLots, setNumUsers } from "../../hooks/slices/auctionSlice";
import { reloadBids } from "../../services/bidServices";

// let serverURL = "http://localhost:5000"
// var socket = io(serverURL, { transports: ['websocket'] })

var socket;
var stompClient;
const AuctionStream = () => {
    console.log("Rerender");
    const [auctionInfo, setAuctionInfo] = useState()
    const [started, setStarted] = useState(false)
    const [currIdx, setCurrIdx] = useState()
    const [nextIdx, setNextIdx] = useState()
    const [joined, setJoined] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, token, role, isAuth } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currAuction, currLot, lots } = useSelector((state => state.auction))


    console.log(lots);
    //s const [intervalId,setId]=useState();
    const { id } = useParams();

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(() => {
        fetchData()

    }, [])

    useEffect(() => {
        socket = new SockJS(WEB_SOCKET)
        stompClient = Stomp.over(socket)
        stompClient.connect({ username: user }, (frame) => {
            stompClient.subscribe('/topic/auction', (data) => {
                var info = JSON.parse(data.body);
                notification.open({
                    title: 'Hello',
                    description: info.message
                })
            })

            stompClient.subscribe("/users/queue/messages", (data) => {
                var info = JSON.parse(data.body)
                var { message, num_curr_users, type } = info;
                console.log(JSON.parse(data.body));
                switch (type) {
                    case 'new-join':
                        dispatch(setNumUsers(num_curr_users))
                        break;

                    case 'new-bid':
                        const { bid_info } = info

                        let latestBid = bid_info.bids[0];
                        if (latestBid.owner === user) {
                            dispatch(setDisable(true))
                        } else {
                            dispatch(setDisable(false))
                        }
                        dispatch(setCurrPrice(latestBid.bid_price))
                        dispatch(setBids(bid_info.bids))
                        dispatch(setLatestBid(bid_info.bids[0]))
                        break;
                    case 'lot-sold':
                        //todo : message to user win lot
                        const { lot } = info
                        console.log(currLot, lot);
                        notification.open(
                            {
                                description: "Bạn đã thắng sản phẩm " + lot.name
                            })
                        dispatch(setCurrLot(lot))
                        break;

                    case 'next-lot':

                        const { curr_lot, next_lot } = info
                        dispatch(setCurrLot(curr_lot));
                        dispatch(setCurrPrice(curr_lot.current_price))
                        dispatch(setDisable(false))
                        dispatch(setDisableSoldButton(false))
                        break;

                    case 'auction-end':
                        setIsModalOpen(true);
                        break;
                    default: break;


                }

            })

        })

    }, [])



    const handleSend = () => {
        stompClient.send("/nctn-ws/hello", {}, JSON.stringify({ name: "quan" }))
    }


    const fetchData = async () => {
        console.log("Fetch");
        try {
            const { data } = await axios.get(AUCTION_URL + "/" + id);
            console.log("Fetch auction info ", data);
            const { current_lot, next_lot } = data;
            setCurrIdx(current_lot)
            setNextIdx(next_lot)
            setAuctionInfo(data);
            setStarted(data.auction.is_stream)

            const currTmp = data.lots.filter(lot => lot.order_in_lot === current_lot)[0];
            console.log(currTmp);
            dispatch(setLots(data.lots))
            dispatch(setCurrLot(currTmp))
            dispatch(setCurrPrice(currTmp.current_price))

        } catch (error) {
            console.log(error);
        }



    }
    if (!isAuth) {
        return <Navigate replace to={'/login?redirectTo=' + encodeURIComponent(window.location.pathname)} />
    }

    const openNotification = (data) => {
        notification.success({
            message: `Message`,
            description:
                `You won lot ${data.name} with price ${data.price}$`,
            placement: "bottomLeft"
        });
    };


    const renderAuctionStreamScreen = () => {
        if (started) {
            return <div className="flex flex-col">
                <div className="">
                    <UpperStreamPart auctionInfo={auctionInfo} stompClient={stompClient} />
                    <StreamFunction auctionInfo={auctionInfo} />
                </div>
                <div className="lower-stream-page">
                    <LotList lots={auctionInfo.lots} next={nextIdx} title={"Sản phẩm tiếp theo"}></LotList>
                </div>
            </div>
        } else {
            return <BeforeStream auction={auctionInfo.auction} />
        }
    }

    const togglePopup = async () => {
        try {

            const { data } = await axios.get(JOIN_AUCTION + "?id=" + id, config)
            setJoined(!joined)
        }
        catch (e) {
            console.log(e);
        }

    }

    if (!joined) {
        return <Popup
            content={<div className="absolute top-1/2 left-1/2 -mr-1/2 -translate-x-1/2 -translate-y-1/2">
                <b className="text-xl">Chào mừng bạn</b>
                <p>Hãy tham gia ngay bây giờ</p>
                {/* <Button className="mr-2" type="primary" onClick={togglePopup}>Join Now</Button> */}
                <div className="flex flex-row gap-x-4">
                <Button type="danger" onClick={() => navigate("/")}>Trở về</Button>
                <Loading loading={loading} content={<Button className="mr-2" type="primary" onClick={() => {
                    setLoading(!loading)
                    setTimeout(() => togglePopup()
                        , 4000)
                }}>Tham gia</Button>} />
                </div>
            </div>}
            handleClose={togglePopup} />
    }

    if (auctionInfo === null) {
        return <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
        </div>

    }

    const handleOnOk = () => {
        setTimeout(() => {
            setIsModalOpen(false)
            navigate("/profile/items")
        }, 2000)


    }

    const handleOnCancel = () => {
        setTimeout(() => {
            setIsModalOpen(false)
            navigate("/")
        }, 2000)

    }

    return (
        <>
            {renderAuctionStreamScreen()}
            <Modal
                title={<h1 className="text-green-400 text-3xl">Phiên đấu giá kết thúc</h1>}
                centered
                visible={isModalOpen}
                onOk={() => handleOnOk()}
                onCancel={() => handleOnCancel()}
                okText="Xem sản phẩm"
                cancelText="Về trang chủ"
            >
                Phiên đấu giá đã kết thúc. Cảm ơn bạn đã tham gia
                <p>Hẹn gặp lại bạn trong nhưng phiên sắp tới</p>
            </Modal>
        </>

    )
}
export default AuctionStream;
