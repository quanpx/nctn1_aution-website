import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import {Link, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';
import "./BasePage.css"
import NavBar from './NavBar';
import SubNavbar from './SubNavbar';
import "./color.css";
const {Content,Footer,Header} = Layout;
const BasePage = () =>
{
    let location = useLocation();
    const navigate = useNavigate();

return (
  <Layout>
    <Header
      style={{
         backgroundColor:'white',
          position:'relative',
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between'
      }}
    > <h2><Link to={'/'}>BlueDeQuan</Link></h2>
      <NavBar />
    </Header>
    <Content
      className="site-layout"
      style={{
        padding: '0 50px',
      }}
    >
      <Breadcrumb
        style={{
          backgroundColor:'var(--color-6)',
          paddingTop:'3px',
          padding:'5px',
          top:'5px',
        }}
        separator='|'
      >
        <Breadcrumb.Item><Link to="/">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/auctions">Phiên đấu giá</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/">Trực tiép</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/">Bộ sưu tập</Link></Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item><Link to="/">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to={location.pathname.split("/")[1]}>{location.pathname.split("/")[1]}</Link></Breadcrumb.Item>
        <Breadcrumb.Item >{location.pathname.split("/")[2]}</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 380,
        }}
      >
        <Outlet/>
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
     <h4> DATN - Website đấu giá đồ thủ công </h4>
     <h3> GVHD - ThS. Do Tuan Anh </h3>
    </Footer>
  </Layout>
)
}
export default BasePage;