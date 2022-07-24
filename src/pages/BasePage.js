import React from 'react';
import { Layout } from 'antd';
import {Outlet} from 'react-router-dom';
import Header from '../components/Header';
const {Content,Footer} = Layout;
const BasePage = () =>
{
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
                <Outlet/>
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
export default BasePage;