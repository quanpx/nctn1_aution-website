import AuctionRow from "./AuctionRow";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Auction from "./Auction";
import { AUCTION_URL, REGISTERED_AUCTION } from "../../config/server";
import { Pagination, Skeleton } from "antd";
import "./Auction.css"
import AuctionItem from "./AuctionItem";
import { handleLoading } from "../../utils/renderUtils";

const hour = 100; // For check state of auction

const AuctionDemo = ({ paging }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData();
    }, [])

  

    const fetchData = async () => {
        try {
            const { data } = await axios.get(AUCTION_URL, {
                params: {
                    size: 6
                }
            })
          
            setData(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    }


    const checkIsNew = (startTime) => {
        let start = new Date(startTime).getTime()

        let now = new Date().getTime()

        let diff = (start - now) / (1000 * 60 * 60)

        return diff < hour ? true : false
    }

    if(loading)
    {
        return <div>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
        </div>
    }
    
    return <div className='flex flex-row justify-around border-b-4 pb-5' >
        {data.auctions.map((item, idx) => {
            let handledItem = { ...item, is_new: checkIsNew(item.start_time) }
            return <Auction key={idx} aution={handledItem} />
        }
        )}
    </div>

};
export default AuctionDemo;