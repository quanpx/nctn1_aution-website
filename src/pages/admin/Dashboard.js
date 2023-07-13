import React, { Children } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css"
const Dashboard = () => {
    return (
        <div className="dashboard flex flex-row">
            <div className="admin-sidebar basis-1/6">
                <h1 className="text-2xl p-2 mt-20 ml-5">Admin Page</h1>
                <ul className="flex gap-y-5 flex-col pl-5">
                    <li>
                        <Link to={"/admin/createItem"}>Create item</Link>
                    </li>
                    <li>
                        <Link to={"/admin/alllots"}>Lots Manage</Link>
                    </li>
                    <li>
                        <Link to={"/admin/allauctions"}>Auctions Manage</Link>
                    </li>
                   
                </ul>
            </div>
            <div className="admin-content basis-5/6">
                <Outlet />
            </div>

        </div>
    )
}
export default Dashboard;