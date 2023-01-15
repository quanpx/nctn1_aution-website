import React from "react";
import {BellOutlined, HeartOutlined, MoneyCollectOutlined, UserOutlined,} from "@ant-design/icons";
import {Layout, Menu} from "antd";
import MenuItem from "./MenuItem";
import "./Common.css";
import {Link, useNavigate} from "react-router-dom";

const SubNavbar = () => {
    const auth = localStorage.getItem("IS_AUTH");
    const username = localStorage.getItem("AUCTION_USER");
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("AUCTION_TOKEN");
      localStorage.removeItem("AUCTION_USER");
      localStorage.removeItem("IS_AUTH");
      navigate("/");
    };
    const handleLogin = () => {
      navigate("/login");
    };
  
    return (
      <Menu
        className="sub-navbar"
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
      >
        {auth && (
          <>
            <Menu.Item>
              <Link to="#">Auction</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={"/#"}>
                <MenuItem icon={HeartOutlined} value={"Interested"} />
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={"/bids"}>
                <MenuItem icon={MoneyCollectOutlined} value={"Your Bids"} />
              </Link>
            </Menu.Item>
          </>
        )}
  

      </Menu>
    );
  };
  export default SubNavbar;