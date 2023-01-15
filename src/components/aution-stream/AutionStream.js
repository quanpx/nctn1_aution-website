import React, {useEffect, useRef, useState} from "react";
import LotList from "./LotList";
import "./AuctionStream.css"
import axios from "axios";
import {useParams} from "react-router-dom";
import {AUCTION_URL} from "../../config/server";
import UpperStreamPart from "./UpperStreamPart";
import {io} from "socket.io-client";

let serverURL = "http://localhost:5000"
var socket = io(serverURL, {transports: ['websocket']})
let url = "http://localhost:8000/api/sse/subscribe"
const source = new EventSource(url)

const AuctionStream = () => {
    const [auctionInfo, setAuctionInfo] = useState()
    const [currIdx,setCurrIdx] = useState()
    const [nextIdx,setNextIdx] = useState()

    //s const [intervalId,setId]=useState();
    const {id} = useParams();

    console.log(auctionInfo)
    useEffect(() => {

        source.addEventListener('next', event => {
            fetchData();
        })

        source.addEventListener("auction-update", (event)=>{
             fetchData()
        })

        source.onopen = event => console.log("Connection opened");
        source.onerror = event => console.error("Connection error");


        socket.on('connected', function (data) {
            //TODO
            console.log(data);
        })
        socket.on("disconnect", data => {
            //TODO
            console.log(data);
        })


        fetchData()

    }, [])


    const fetchData = async () => {
        console.log("Fetch");
        await axios.get(AUCTION_URL + "/" + id)
            .then(res => res.data)
            .then(data => {
                const {current_lot,next_lot} = data;
                setCurrIdx(current_lot)
                setNextIdx(next_lot)
                setAuctionInfo(data);

            })
            .catch(e => console.log(e))
    }


    const handleNextButton = async () => {
        const {data} = await axios.get(AUCTION_URL+`/next?id=${auctionInfo.auction.id}`)
        const {current_lot,next_lot} = data;
        setCurrIdx(current_lot)
        setNextIdx(next_lot)
    }
    return (
        <div className="stream-page">
            {auctionInfo!=null&&<UpperStreamPart onNextButton={handleNextButton} auctionInfo={auctionInfo} source={source} socket={socket}/>}
            <div className="lower-stream-page">
                {auctionInfo && <LotList lots={auctionInfo.lots} next={nextIdx} title={"Next Lots"}></LotList>}
            </div>
        </div>

    )
};

export default AuctionStream;
