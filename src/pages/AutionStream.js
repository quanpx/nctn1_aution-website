import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import AuctionInfo from '../components/auction/AuctionInfo';
import LotList from '../components/aution-stream/LotList';
import StreamImage from '../components/aution-stream/StreamImage';
import StreamVideo from '../components/aution-stream/StreamVideo';
import Header from '../components/Header';
import LotItems from '../components/lot/LotItems';
const { Content, Footer, Sider } = Layout;


const AuctionStream = () => (
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

                    <StreamVideo />
                    <StreamImage />
                </Content>
               <LotList/>
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

export default AuctionStream;