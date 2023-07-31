import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { AUCTION_URL, LOT_URL } from '../../config/server';
import { Layout, Skeleton } from 'antd';
import "./LotDetail.css"
import LotDescription from './LotDescription';
import LotAction from './LotAction';
import LotList from '../aution-stream/LotList';

const { Content, Footer, Sider } = Layout;
const LotDetail = () => {
    const [data, setData] = useState({ lot: null, relatedLots: [] })

    const [loading, setLoading] = useState(true)
    const bids = useSelector((state) => state.bid)
    const { id } = useParams();
    useEffect(() => {


        fetchData()
    }, [id])

    const fetchData = async () => {
        const lotResp = await axios.get(LOT_URL + "/" + id)
            .then(res => res.data)

        const relatedResp = await axios.get(AUCTION_URL + "/" + lotResp.session)
            .then(res => res.data)

        setData({ lot: lotResp, relatedLots: relatedResp.lots.filter(lot => lot.id != lotResp.id) })

        setLoading(false)
    }

    if (loading) {
        return <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
        </div>
    }
    return <div className='flex flex-row'>
        <LotDescription lot={data.lot} />
        <LotAction lot={data.lot} />
    </div>
}
export default LotDetail;