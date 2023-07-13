import React, { Children } from "react";
import { Link, Outlet } from "react-router-dom";
const Profile= () => {
    return (
        <div className="flex flex-row">
            <div className="basis-1/6">
                <h1 className="text-2xl p-2 mt-20 ml-5">Profile</h1>
                <ul className="flex gap-y-5 flex-col pl-5">
                    <li>
                        <Link to={"favorites"}>Your favorites</Link>
                    </li>
                    <li>
                        <Link to={"auctions"}>Your auctions</Link>
                    </li>
                    <li>
                        <Link to={"items"}>Your items</Link>
                    </li>
                    <hr/>
                    <li>
                        <Link to={"editprofile"}>Edit Profile</Link>
                    </li>
                    <li>
                        <Link to={"logout"}>Logout</Link>
                    </li>
                   
                </ul>
            </div>
            <div className="basis-5/6">
                <Outlet />
            </div>

        </div>
    )
}
export default Profile;