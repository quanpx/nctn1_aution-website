import AuctionRow from "./AuctionRow";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Auction from "./Auction";
import { AUCTION_URL } from "../../config/server";
import { Pagination } from "antd";
import "./Auction.css"

const hour = 100; // For check state of auction

const Auctions = ({ paging }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await axios.get(AUCTION_URL)
      .then(res => res.data)
      .then(data => setData(data)
      )
      .catch(e => console.log(e))
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
        <div className='auction-list'>
          {data.auctions.map((item, idx) => {
            let handledItem = { ...item, is_new: checkIsNew(item.start_time) }
            return <Auction key={idx} aution={handledItem} />
          }
          )}
          {paging && <Pagination
            style={{ marginTop: '15px' }}
            defaultCurrent={1}
            total={30}
          />}
        </div> : <h1>Wait</h1>}

    </div>
  )
};
export default Auctions;