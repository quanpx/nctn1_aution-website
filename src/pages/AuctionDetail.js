import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import AuctionInfo from '../components/auction/AuctionInfo';
import Header from '../components/Header';
import LotItems from '../components/lot/LotItems';
const { Content, Footer, Sider } = Layout;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const lotItems = [
    {
        id: 1,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:false
    },
    {
        id: 2,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 3,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:false
    },
    {
        id: 4,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 5,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 6,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 7,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:false
    },
    {
        id: 8,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 9,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:false
    }
]

const AuctionDetail = () => (
    <Layout>
        <Header />
        <Content
            style={{
                padding: '0 50px',
                margin:'0 50px 0 100px'
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
                    <AuctionInfo/>
                    <LotItems lots={lotItems} />
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
);

export default AuctionDetail;