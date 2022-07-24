import AuctionRow from "./AuctionRow";
import React, { useEffect, useState } from 'react';
import { ROOT_API } from "../../config/server";
import axios from "axios";
import Auction from "./Auction";
const autionsInitial = [
    {
        id: 1,
        type:"Furniture",
        address: "Hanoi",
        startTime: "19:00",
        lot: 20,
        follow:1000
    },
    {
        id: 2,
        type:"Painting",
        address: "HoChiMinh",
        startTime: "19:00",
        lot: 50,
        follow:1000
    },
    {
        id: 3,
        type:"Antique",
        address: "Hanoi",
        startTime: "19:00",
        lot: 20,
        follow:1000
    }
]

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
                <Auction key={item.id} aution={item} />
            ):<h1>Wait</h1>}
        </div>
    )
};
export default Auctions;