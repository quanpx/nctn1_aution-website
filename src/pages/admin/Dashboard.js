import React, { Children } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css"
const Dashboard = () => {
    return (
        <div className="flex flex-row">
            <div className="basis-1/6 border-r-4">
                <h1 className="text-2xl p-2 mt-20 ml-5">Quản trị</h1>
                <ul className="flex gap-y-5 flex-col pl-5">
                    <li>
                        <Link className="text-1xl border-b-2 pb-3" to={"/admin/createItem"}>Tạo sản phẩm</Link>
                    </li>
                    <li>
                        <Link className="text-1xl border-b-2 pb-3"  to={"/admin/alllots"}>Quản lý sản phẩm</Link>
                    </li>
                    <li>
                        <Link className="text-1xl border-b-2 pb-3"  to={"/admin/allauctions"}>Quản lý phiên đấu giá</Link>
                    </li>
                   
                </ul>
            </div>
            <div className="basis-5/6">
                <Outlet />
            </div>

        </div>
    )
}
export default Dashboard;