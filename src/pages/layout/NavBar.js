import React, {useEffect, useState} from "react";
import {BellOutlined, HeartOutlined, HomeOutlined, MoneyCollectOutlined, UserOutlined,} from "@ant-design/icons";
import {Badge, Button, Menu, Popover} from "antd";
import "./Common.css";
import {Link, useNavigate} from "react-router-dom";

const url = "http://localhost:8000/api/sse/subscribe"
let source  = new EventSource(url);

const NavBar = () => {
    const auth = localStorage.getItem("IS_AUTH");
    const username = localStorage.getItem("AUCTION_USER");
    const navigate = useNavigate();
    const [current, setCurrent] = useState('home');
    const [hasNoti, setHasNoti] = useState(false);
    const [noti, setNoti] = useState([])

    useEffect(() => {


        source.addEventListener("notification", (e) => {
            console.log(e)
            setHasNoti(true)
            setNoti([e.data, ...noti])
        })

        source.onopen = (e) => {
            console.log("Connected to server")
        }

        source.onerror = (e) => {
            console.log("Failed to connected!")
        }
    }, [])
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
            return <p>No notification</p>
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
                    label: <a> Profile</a>,
                    key: 'profile',
                },
                {
                    label: <a onClick={handleLogout}> Logout </a>,
                    key: 'logout',
                }
            ]
        } else {
            items = [

                {
                    label: <a onClick={handleLogin}>Login</a>,
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
            label: 'Home',
            key: 'home',
            icon: <HomeOutlined/>,
        },
        {
            label: 'Interested',
            key: 'mail',
            icon: <HeartOutlined/>,
        },
        {
            label: <Link to={'/your-items'}>Your items</Link> ,
            key: 'bid',
            icon: <MoneyCollectOutlined/>,
        },
        {
            label: <Popover onClick={readNoti} placement="bottomRight" title={"Notification"} content={notiContent()}
                            trigger="click">
                Notification
            </Popover>,
            key: 'noti',
            icon: <Badge dot={hasNoti}> <BellOutlined/></Badge>,
        },
        {
            label: 'Account',
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
