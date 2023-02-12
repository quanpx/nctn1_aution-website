import React, {useEffect, useState} from 'react';
import "./Auction.css";
import AuctionName from "./AuctionName";
import AuctionTime from "./AuctionTime";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {AUCTION_URL} from "../../config/server";
import {setAuction} from "../../hooks/slices/auctionSlice";

const AuctionDetailInfo = () => {
    const [data, setData] = useState(null)
    const params = useParams();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await axios.get(AUCTION_URL + "/" + params.id)
            .then(res => res.data)
            .then(data => {
                setData(data);
            })
            .catch(e => console.log(e))
    }
    return (

        <div className="auction-info">
            {data != null ?
                <>
                    <AuctionName auction={data}/>
                    <AuctionTime auction={data}/>
                </> : <h1>Loaing</h1>}
        </div>

    )
}
export default AuctionDetailInfo;