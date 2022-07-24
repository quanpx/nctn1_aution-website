import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { ROOT_API } from '../../config/server';
import { Layout } from 'antd';
import Header from '../../components/Header';
import "./LotDetail.css"
import LotDescription from './LotDescription';
import LotAction from './LotAction';
const { Content, Footer, Sider } = Layout;
const LotDetail = () =>
{
    const [lot,setLot]=useState(null)
    const bids=useSelector((state)=>state.bid)
    const params = useParams();
    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        await axios.get(ROOT_API + "lot/" + params.id)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setLot(data);
            })
            .catch(e => console.log(e))
    }
    console.log(bids);
    return (
        <Layout>
        <Header />
        <Content
            style={{
                padding: '0 50px',
                margin: '0 50px 0 100px',
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
                        display: 'flex',
                        flexDirection: 'row',
                        gap: "15%"
                    }}
                >
                {lot!=null?<div className='main-content'>
                    <LotDescription lot={lot}/>
                    <LotAction lot={lot}/>
                </div>:<h1>Loading</h1>}
        
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
    </Layout>
    )
}
export default LotDetail;