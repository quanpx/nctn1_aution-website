import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import axios from "axios";
import { AUCTION_URL } from "../../config/server";
import { Skeleton } from "antd";
import AuctionCard from "../../components/admin/AuctionCard";
import { Link } from "react-router-dom";

const AuctionDashboard = () => {
    const [data,setData] = useState(null)
    /*
    data : {count, auctions}
    */
    const {token} = useAuth()
    useEffect(()=> {
        fetchAuctions()
    },[])
    const fetchAuctions = async (config) => {
        try {
          const { data } = await axios.get(AUCTION_URL,config)
          console.log(data);
          setData(data)
        } catch (error) {
          console.log(error);
        }
      }

    if(data === null)
    {
        return <h1>Loading</h1>
    }
    return <div className="flex flex-col gap-y-5 mt-20 ">
        <h1 className="text-2xl"><Link to={'/admin/createAuction'}>Create Auction</Link></h1>
        {data.auctions.map((auction,idx)=> <AuctionCard auction={auction}/>)}
    </div>

}
export default AuctionDashboard;