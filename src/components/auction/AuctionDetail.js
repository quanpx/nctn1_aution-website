import {Layout} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AuctionInfo from './AuctionInfo';
import LotItems from '../lot/LotItems';
import {useDispatch} from "react-redux";
import {setAuction} from '../../hooks/slices/auctionSlice';
import {AUCTION_URL} from '../../config/server';

const { Content, Footer, Sider, Header } = Layout;

const AuctionDetail = () => {
    const [data, setData] = useState()
    const params = useParams();
    const dispatch = useDispatch()

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        await axios.get(AUCTION_URL + "/" + params.id)
            .then(res => res.data)
            .then(data => {
                dispatch(setAuction({ auction: data.auction }))
                setData(data);
            })
            .catch(e => console.log(e))
    }
    return (
        <Content
            style={{
                marginTop: '30px',
                padding: '10px 50px',
                minHeight: 280,
            }}
        >
            {data != null ?
                <div>
                    <AuctionInfo />
                    <LotItems lots={data.lots} />
                </div> : <h1>Wait a moment</h1>}
        </Content>
    )
}

export default AuctionDetail;