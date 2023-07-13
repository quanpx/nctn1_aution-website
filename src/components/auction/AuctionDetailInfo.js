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
    const [loading,setLoading] = useState(true)
    const params = useParams();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await axios.get(AUCTION_URL + "/" + params.id)
            .then(res => res.data)
            .then(data => {
                setData(data);
                setLoading(false)
            })
            .catch(e => console.log(e))
    }
    if(loading)
    {
        return <h1>Loading</h1>
    }
    return (

        <div className="auction-info">
                    <AuctionName auction={data}/>
                    <AuctionTime auction={data}/>
        </div>

    )
}
export default AuctionDetailInfo;