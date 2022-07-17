import React from "react";
import { Link, Route, Routes } from "react-router-dom";
const Sidebar = ()=>
{
    return (<div >
        <h1>Admin Page</h1>
        <ul>
            <li>
            <Link to={"/admin/createItem"}>Create item</Link>
            </li>
            <li>
            <Link to={"/admin/createAuction"}>Create auction</Link>
            </li>
            <li>
            <Link to={"/admin/alllots"}>All lots</Link>
            </li>
        </ul>
       
    </div>)
}

export default Sidebar;