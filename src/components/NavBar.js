import { BellOutlined, HeartOutlined, LaptopOutlined, MoneyCollectOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import MenuItem from './MenuItem';
const { Header, Content, Footer, Sider } = Layout;

const NavBar = () => (
  <Layout>
    <Header className="header">
      <div className="logo" >
       <span style={{color:'white'}}>Antique Auction</span>
     
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{float:'right',width:'500px'}}>
        <Menu.Item>
          <MenuItem icon ={BellOutlined} value ={"Notification"}/>
        </Menu.Item>
        <Menu.Item>
        <MenuItem icon ={HeartOutlined} value ={"Interested"}/>
          </Menu.Item>
        <Menu.Item>
        <MenuItem icon ={MoneyCollectOutlined} value ={"Your Bids"}/>
          </Menu.Item>
        <Menu.Item>
        <MenuItem icon ={UserOutlined} value ={"Account"}/>
      </Menu.Item>
      </Menu>
       </div>
    </Header>
  </Layout>
);

export default NavBar;