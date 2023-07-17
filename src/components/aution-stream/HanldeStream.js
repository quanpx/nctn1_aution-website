import BidList from "./BidList";
import React, { useEffect, useRef, useState } from 'react';
import "./StreamPage.css"
import { Button } from "antd";
import axios from "axios";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AUCTION_URL, UPDATE_AUCTION_STATUS } from "../../config/server";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";


const url = 'http://localhost:8000/nctn-ws/';
const USER = "user"
const ADMIN = "admin"
var stompClient;
const HandleStream = ({auction }) => {
    const [isStart, setIsStart] = useState(auction.is_stream)
    const [isJoined, setIsJoined] = useState(false)
    const [peopleWatching, setPeopleWatching] = useState(0)
    const [started, setStarted] = useState(false)
    const [startable, setStartable] = useState(false)
    const [status,setStatus] = useState('')
    const { role,token,user } = useAuth();
    const videoRef = useRef()
    const { id } = useParams();

    const configs = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(() => {
        setAuctionStatus()
    }, [])

  
    console.log(auction);
    const setAuctionStatus = () => {
        setStatus(auction.status)
        if(auction.status === "start")
        {
            setStarted(true)
            setStartable(false)
        }else 
        {
            setStarted(false)
            setStartable(true)
        }
    }
    const handleStart = async (e) => {

        e.preventDefault()
        const body = {
            id,
            status: "start"
        }
        try {
            await axios.post(UPDATE_AUCTION_STATUS, body, configs)
        }
        catch (error) {
            console.log(error)
        }



    }

    const handleJoin = (e) => {
       stompClient = Stomp.over(() => new SockJS(url));

        stompClient.connect({username: user}, (frame) => {
            console.log(frame);

            stompClient.subscribe('/topic/auction', (greeting) => {
                console.log(JSON.parse(greeting.body));
            })
            stompClient.subscribe("/users/queue/messages",(data)=> {
                console.log(JSON.parse(data.body));
            })
            stompClient.send("/nctn-ws/auction",{}, JSON.stringify({name:user}))
        })


        setIsJoined(true)
    }
    const handleOut = () => {
        stompClient.disconnect()
    }
    const handleEnd = async () => {

        const body = {
            id,
            status: "end"
        }
        try {
            await axios.post(UPDATE_AUCTION_STATUS, body, configs)
        }
        catch (error) {
            console.log(error)
        }
    }
    const resolveStreamFunction = () => {
        console.log(status);
        if (role === "admin") {     
            console.log(startable);
            return <>
                <Button type="" onClick={handleStart} disabled={!startable || auction.status ==='active'}>Start Stream</Button>
                <Button type="" onClick={handleEnd} disabled={startable || auction.status ==='end'}>End Stream</Button>
            </>
        }
    }

    return (
        <div className="stream-video">
            <div className="video">
                <video ref={videoRef} width={250} height={220} />
            </div>
            <div className="stream-function">
                {resolveStreamFunction()}


            </div>
        </div>
    )
}
export default HandleStream;