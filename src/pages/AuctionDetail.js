import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuctionInfo from '../components/auction/AuctionInfo';
import Header from '../components/Header';
import LotItems from '../components/lot/LotItems';
import { ROOT_API } from '../config/server';
import { useDispatch, useSelector,useStore } from "react-redux";
import { setAuction } from '../feature/auctionSlice';

const { Content, Footer, Sider } = Layout;

const AuctionDetail = () => {
    const [data, setData] = useState()
    const params = useParams();
    const dispatch = useDispatch()
    console.log(params)
   
    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        await axios.get(ROOT_API + "auction/" + params.id)
            .then(res => res.data)
            .then(data => {
                dispatch(setAuction({auction:data.auction}))
                setData(data);
            })
            .catch(e => console.log(e))
    }
    return (
        <Layout>
            <Header />
            <Content
                style={{
                    padding: '0 50px',
                    margin: '0 50px 0 100px'
                }}
            >
                <Layout
                    className="site-layout-background"
                    style={{
                        padding: '24px 0',
                    }}
                >
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        {data != null ?
                            <div>
                                <AuctionInfo auction ={data.auction} />
                                <LotItems lots={data.lots} />
                            </div> : <h1>Wait a moment</h1>}
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>)
}
    ;

export default AuctionDetail;