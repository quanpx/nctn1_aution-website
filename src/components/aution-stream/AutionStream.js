import React, { useEffect, useRef, useState } from "react";
import LotList from "./LotList";
import "./AuctionStream.css"
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { AUCTION_URL } from "../../config/server";
import UpperStreamPart from "./UpperStreamPart";
import { io } from "socket.io-client";
import { notification } from "antd";
import { useAuth } from "../../hooks/useAuth";
import StreamFunction from "./StreamFunction";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import BeforeStream from "./BeforeStream";

// let serverURL = "http://localhost:5000"
// var socket = io(serverURL, { transports: ['websocket'] })

var socket;
const url = 'http://localhost:8000/nctn-ws/';
const AuctionStream = () => {
    const [auctionInfo, setAuctionInfo] = useState()
    const [started,setStarted] = useState(false)
    const [currIdx, setCurrIdx] = useState()
    const [nextIdx, setNextIdx] = useState()
    const { user, token, role,isAuth } = useAuth();
    //s const [intervalId,setId]=useState();
    const { id } = useParams();
    console.log("render");
    
    useEffect(() => {

        // socket = new SockJS(url)
        // var stompClient = Stomp.over(socket)

        // stompClient.connect({username: 'quan'+ Math.floor(Math.random() * 10)}, (frame) => {
        //     console.log(frame);

        //     stompClient.subscribe('/topic/auction', (greeting) => {
        //         console.log(JSON.parse(greeting.body));
        //     })
        //     stompClient.subscribe("/users/queue/messages",(data)=> {
        //         console.log(JSON.parse(data.body));
        //     })
        //     stompClient.send("/nctn-ws/auction",{},JSON.stringify({name:"quan"}))
        // })


        fetchData()

    }, [])

   
    const fetchData = async () => {
        console.log("Fetch");
        await axios.get(AUCTION_URL + "/" + id)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                const { current_lot, next_lot } = data;
                setCurrIdx(current_lot)
                setNextIdx(next_lot)
                setAuctionInfo(data);
                setStarted(data.auction.is_stream)

            })
            .catch(e => console.log(e))
    }
    if(!isAuth)
    {
        return <Navigate replace to={'/login?redirectTo='+encodeURIComponent(window.location.pathname)}/>
    }
    const openNotification = (data) => {
        notification.success({
            message: `Message`,
            description:
                `You won lot ${data.name} with price ${data.price}$`,
            placement: "bottomLeft"
        });
    };
    const handleNextButton = async () => {
        const { data } = await axios.get(AUCTION_URL + `/next?id=${auctionInfo.auction.id}`)
        fetchData()
    }

    const renderAuctionStreamScreen = () => {
        if(started)
        {
            return <div className="flex flex-col">
                    <div className="">
                        <UpperStreamPart onNextButton={handleNextButton} auctionInfo={auctionInfo}/>
                        <StreamFunction  onNextButton={handleNextButton} auctionInfo={auctionInfo}/>
                    </div>
                    <div className="lower-stream-page">
                        <LotList lots={auctionInfo.lots} next={nextIdx} title={"Next Lots"}></LotList>
                    </div>
                </div>
        }else {
            return <BeforeStream auction={auctionInfo.auction}/>
        }
    }
    return (
        <>
            {auctionInfo != null ?
                renderAuctionStreamScreen(): <h1>Loading</h1>}
        </>

    )
}
export default AuctionStream;
