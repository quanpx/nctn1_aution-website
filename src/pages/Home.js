import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Auctions from "../components/auction/Auctions";
import Description from "./layout/Description";
import LotItems from '../components/lot/LotItems';
import { LOT_URL } from '../config/server';

const Home = () => {
    const [lots,setLots] = useState([])

    useEffect( () => {
        getAllLots()
    },[])
    const getAllLots = async () => {
        await axios.get(LOT_URL)
          .then(res => res.data)
          .then(dataRes =>{ 
            let keyData = dataRes.lots.slice(0,8);
            setLots(keyData)
            console.log(dataRes);
        })
      }
    return (
        <div>
            <Description />
            <h2 style={{marginTop:'20px'}}>Featured Auctions <a style={{color:'brown',fontSize:'14px'}} href='#'><span>See All</span></a></h2> 
            <Auctions paging={false} />
            <LotItems lots = {lots}/>
        </div>
    )

}
export default Home;