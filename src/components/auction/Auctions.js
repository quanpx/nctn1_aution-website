import AuctionRow from "./AuctionRow";
import React, { useEffect, useState } from 'react';
import { ROOT_API } from "../../config/server";
import axios from "axios";
import Auction from "./Auction";
import AuctionCard from "./AuctionCard";

const Auctions = () => {
    const [data,setData]=useState(null);

    useEffect(()=>
    {
      fetchData();
    },[])

    const fetchData = async () =>
    {
      await axios.get(ROOT_API+"auction")
      .then(res=>res.data)
      .then(data=>setData(data))
      .catch(e=>console.log(e))
    }
   
    console.log(data)
    return (
        <div className="auction-list">
            {data!=null? data.auctions.map((item,idx) => 
                <AuctionCard key={item.id} auction={item} />
            ):<h1>Wait</h1>}
        </div>
    )
};
export default Auctions;