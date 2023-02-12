import AuctionRow from "./AuctionRow";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Auction from "./Auction";
import { AUCTION_URL, REGISTERED_AUCTION } from "../../config/server";
import { Pagination } from "antd";
import "./Auction.css"
import AuctionItem from "./AuctionItem";
import { useAuth } from "../../hooks/useAuth";

const hour = 100; // For check state of auction

const Auctions = ({ paging }) => {
  const [data, setData] = useState(null);
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth();
  const [registedAuctions, setRegistedAuctions] = useState([])
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
      "Acept": "application/json"
    }

  }

  // useEffect (()=> {
  //   fetchAuctions()
  // },[registedAuctions])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await fetchAuctions()
    await fetchRegisteredAuctions()
    setLoading(false)

  }
  const fetchAuctions = async () => {
    try {
      const { data } = await axios.get(AUCTION_URL)
      let temp = data.auctions.map(auction => {
        let registed = checkRegistered(auction.id)
        return { ...auction, is_registed: registed }
      })
      setData(data)
      setAuctions(temp)
    } catch (error) {
      console.log(error);
    }
  }
  const checkRegistered = (id) => {
    if (registedAuctions.length === 0) {
      return false;
    }

    for (var i = 0; i < registedAuctions.length; i++) {
      let item = registedAuctions[i];
      console.log(item);
      if (item.auction.id === id) {
        return true;
      }
    }
    return false;

  }
  const fetchRegisteredAuctions = async () => {
    try {

      const { data } = await axios.get(REGISTERED_AUCTION, config)
      console.log(data);
      setRegistedAuctions(data.registered_auctions)

    }
    catch (error) {
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
    <>
      {!loading ? <div className="flex flex-row gap-2" >
        {data != null ?
          <>
            <div className="filter-side basis-1/3 bg-red-200"></div>
            <div className=' basis-2/3'>
              <h1 className="text-base">{data.count} results</h1>
              <div className='flex flex-col justify-items-center gap-2'>
                {data.auctions.map((item, idx) => {
                  let handledItem = { ...item, is_new: checkIsNew(item.start_time) }
                  return <AuctionItem key={idx} aution={handledItem} />
                }
                )}
                {paging && <Pagination
                  style={{ marginTop: '15px' }}
                  defaultCurrent={1}
                  total={30}
                />}
              </div>
            </div>

          </>
          : <h1>Wait</h1>}

      </div> : <h1>Loading....</h1>}
    </>

  )
};
export default Auctions;