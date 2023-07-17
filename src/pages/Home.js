import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Auctions from "../components/auction/Auctions";
import Description from "./layout/Description";
import LotItems from '../components/lot/LotItems';
import { LOT_URL } from '../config/server';
import AuctionDemo from '../components/auction/AuctionDemo';
import Introduction from '../components/home/Introduction';
import StayConnect from '../components/home/StayConnect';
import { useFetchFavoritesQuery } from '../hooks/apis/favoriteApi';
import { useAuth } from '../hooks/useAuth';
import { Skeleton } from 'antd';

const Home = () => {
    const [lots, setLots] = useState([])
    const {token} = useAuth()
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        getAllLots()
    }, [])
    const getAllLots = async () => {

        try {
            const { data } = await axios.get(LOT_URL, { params: { size: 8 } })
            setLots(data.lots)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    }

    if (loading) {
        return <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
        </div>
    }
    return (
         <div className='flex flex-col'>
            <Description />
            <h2 className='text-base text-red-800 mt-5 p-2'> Phiên đấu giá mới <a href='/auctions'><span>Tất cả</span></a></h2>
            <AuctionDemo />
            <Introduction/>
            <StayConnect/>
            {/* <h2 className='text-base text-red-800 mt-5 p-2'> All lots</h2>
            <LotItems lots={lots} /> */}
        </div>
        
    )

}
export default Home;