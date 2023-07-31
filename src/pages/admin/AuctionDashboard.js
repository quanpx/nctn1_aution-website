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
        return <div>
          <Skeleton active/>
          <Skeleton active/>
          <Skeleton active/>
        </div>
    }
    return <div className="flex flex-col gap-y-5 mt-5 ">
        <h1 className="text-2xl ml-2"><Link to={'/admin/createAuction'}>Tạo phiên đấu giá mới</Link></h1>
        {data.auctions.map((auction,idx)=> <AuctionCard auction={auction} key={idx}/>)}
    </div>

}
export default AuctionDashboard;