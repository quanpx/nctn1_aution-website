import React from "react";

export const useAuth = () =>
{
    const token = localStorage.getItem("AUCTION_TOKEN");
    const user=localStorage.getItem("AUCTION_USER");
    const isAuth=localStorage.getItem("IS_AUTH");
    const role = localStorage.getItem("USER_ROLE")

    return {user,token,isAuth,role};
}