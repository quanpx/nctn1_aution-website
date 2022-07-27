import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css"
import { useSelector } from "react-redux";
const Dashboard  = () =>
{
    const auth = useSelector(state=>state.auth);

    console.log(auth);
    return (
        <div className="dashboard">
            <div className="admin-sidebar">
            <Sidebar/>
            </div>
            <div className="admin-content">
            <Outlet/>
            </div>
           
        </div>
    )
}
export default Dashboard;