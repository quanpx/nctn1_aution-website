import AuctionRow from "./AuctionRow";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Auction from "./Auction";
import { AUCTION_URL, REGISTERED_AUCTION } from "../../config/server";
import { Pagination } from "antd";
import "./Auction.css"
import AuctionItem from "./AuctionItem";

const hour = 100; // For check state of auction

const AuctionDemo = ({ paging }) => {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const {data} =  await axios.get(AUCTION_URL, {
                params: {
                    size: 6
                }
            })
            console.log(data);
            setData(data)
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

    return (
        <div >
            {data != null ?
                <>
                    <div className='flex flex-row justify-around '>
                        {data.auctions.map((item, idx) => {
                            let handledItem = { ...item, is_new: checkIsNew(item.start_time) }
                            return <Auction key={idx} aution={handledItem} />
                        }
                        )}
                    </div>
                </>
                : <h1>Wait</h1>}

        </div>
    )
};
export default AuctionDemo;