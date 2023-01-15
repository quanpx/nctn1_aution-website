import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios'
import {AUCTION_URL, LOT_URL} from '../../config/server';
import {Layout} from 'antd';
import "./LotDetail.css"
import LotDescription from './LotDescription';
import LotAction from './LotAction';
import LotList from '../aution-stream/LotList';

const { Content, Footer, Sider } = Layout;
const LotDetail = () => {
    const [data, setData] = useState({ lot: null, relatedLots: [] })

    const bids = useSelector((state) => state.bid)
    const { id } = useParams();
    useEffect(() => {

        const fetchData = async () => {
            const lotResp = await axios.get(LOT_URL + "/" + id)
                .then(res => res.data)

            const relatedResp = await axios.get(AUCTION_URL + "/" + lotResp.session)
                .then(res => res.data)

            setData({ lot: lotResp, relatedLots: relatedResp.lots.filter(lot => lot.id != lotResp.id) })
        }
        fetchData()
    }, [id])

    return (
        <Content
            style={{
                padding: '0 24px',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'row',
                gap: "15%"
            }}
        >
            {data.lot != null ?
                <div>
                    <div className='main-content'>
                        <LotDescription lot={data.lot} />
                        <LotAction lot={data.lot} />
                    </div>
                    <div>
                        <LotList lots={data.relatedLots} title={"Related items"} />
                    </div>

                </div>
                : <h1>Loading</h1>}

        </Content>

    )
}
export default LotDetail;