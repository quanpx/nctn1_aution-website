import { BellOutlined, DownOutlined, HeartOutlined, MoneyCollectOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import "./Header.css";


const Header = () => {
    const auth = localStorage.getItem("IS_AUTH");
    const username = localStorage.getItem("AUCTION_USER")
    const navigate = useNavigate();

    const menu = (
        <Menu
          items={auth?[
            {
              key: '1',
              label: (
                <Link to={"/user/profile"}>Profile</Link>
              ),
            },
            {
              key: '2',
              label: (
                <h4 onClick={()=>handleLogout()}>Logout</h4>
              ),
            }
          ]:[
            {
              key: '1',
              label:  <Link to={"/login"}>Login</Link>
            },
          ]}
        />
      );
    const handleLogout = () => {
        localStorage.removeItem("AUCTION_TOKEN");
        localStorage.removeItem("AUCTION_USER")
        localStorage.removeItem("IS_AUTH")
        navigate("/")

    }
    const handleLogin = () => {
        navigate("/login")
    }

    return (


        <div className="header" >
            <h3 style={{ color: 'white' }}><Link to={"/"}>Antique Auction</Link></h3>

            <Menu className="nav">
                {
                    auth &&
                    <>
                        <Menu.Item className='nav-item'>
                            <MenuItem icon={BellOutlined} value={"Notification"} />
                        </Menu.Item>
                        <Menu.Item className='nav-item'>
                            <Link to={"/loves"}>
                                <MenuItem icon={HeartOutlined} value={"Interested"} />
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='nav-item'>
                            <Link to={"/bids"}>
                                <MenuItem icon={MoneyCollectOutlined} value={"Your Bids"} />
                            </Link>
                        </Menu.Item>

                    </>
                }

                <Menu.Item className='nav-item'>
                    <Dropdown overlay={menu}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                            <MenuItem icon={UserOutlined} value={username?username:"Account"} />
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    {auth ?
                        <>
                            <Menu.Item key="one" value="Profile" >
                                Profile
                            </Menu.Item>
                            <Menu.Item key="two" value="Logout" onClick={handleLogout}>
                                Logout
                            </Menu.Item></> : <Menu.Item key="three" value="Login" onClick={handleLogin}>
                            Login
                        </Menu.Item>
                    }
                </Menu.Item>




            </Menu>
        </div>

    )
}
export default Header;