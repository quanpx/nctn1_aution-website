import React, {useEffect, useState} from "react";
import {BellOutlined, HeartOutlined, HomeOutlined, MoneyCollectOutlined, UserOutlined,} from "@ant-design/icons";
import {Badge, Button, Menu, Popover} from "antd";
import "./Common.css";
import {Link, useNavigate} from "react-router-dom";


const NavBar = () => {
    const auth = localStorage.getItem("IS_AUTH");
    const username = localStorage.getItem("AUCTION_USER");
    const navigate = useNavigate();
    const [current, setCurrent] = useState('home');
    const [hasNoti, setHasNoti] = useState(false);
    const [noti, setNoti] = useState([])

    const handleLogout = () => {
        localStorage.removeItem("AUCTION_TOKEN");
        localStorage.removeItem("AUCTION_USER");
        localStorage.removeItem("IS_AUTH");
        navigate("/");
    };
    const handleLogin = () => {
        navigate("/login");
    };

    const notiContent = () => {
        if (noti.length == 0) {
            return <p>Thông báo</p>
        } else {
            return <div>
                {noti.map((item, idx) => <p key={idx}>{item}</p>)}
            </div>
        }
    }
    const profileItems = () => {
        let items = []
        if (auth) {
            items = [
                {
                    label: <Link to={'profile/favorites'}> Profile </Link>,
                    key: 'profile',
                },
                {
                    label: <a onClick={handleLogout}> Đăng xuất </a>,
                    key: 'logout',
                }
            ]
        } else {
            items = [

                {
                    label: <a onClick={handleLogin}>Đăng nhập</a>,
                    key: 'login',
                }
            ]
        }
        return items;
    }
    const readNoti = () => {
        setHasNoti(false)
    }
    const items = [
        {
            label:<Link to={'/'}>Trang chủ</Link>,
            key: 'home',
            icon: <HomeOutlined/>,
        },
        {
            label: <Popover onClick={readNoti} placement="bottomRight" title={"Notification"} content={notiContent()}
                            trigger="click">
                Thông báo
            </Popover>,
            key: 'noti',
            icon: <Badge dot={hasNoti}> <BellOutlined/></Badge>,
        },
        {
            label: 'Tài khoán',
            key: 'account',
            icon: <UserOutlined/>,
            children: profileItems()
        }
    ];
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <Menu className="menu" selectedKeys={[current]} onClick={onClick} theme={"light"} mode="horizontal"
              items={items}/>
    );
};
export default NavBar;
