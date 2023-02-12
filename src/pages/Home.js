import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Auctions from "../components/auction/Auctions";
import Description from "./layout/Description";
import LotItems from '../components/lot/LotItems';
import { LOT_URL } from '../config/server';
import AuctionDemo from '../components/auction/AuctionDemo';

const Home = () => {
    const [lots, setLots] = useState([])
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
    return (
        <>
        {!loading ? <div className='flex flex-col'>
            <Description />
            <h2 className='text-base text-red-800 mt-5 p-2'> Featured Auctions <a href='/auctions'><span>See All</span></a></h2>
            <AuctionDemo />
            <h2 className='text-base text-red-800 mt-5 p-2'> All lots</h2>
            <LotItems lots={lots} />
        </div>: <h1>Loading...</h1>}
        </>
        
    )

}
export default Home;