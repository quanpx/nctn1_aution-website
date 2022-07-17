import React from "react";

export const useAuth = () =>
{
    const token = localStorage.getItem("AUCTION_TOKEN");
    const user=localStorage.getItem("AUCION_USER");
    const isAuth=localStorage.getItem("IS_AUTH");

    return [user,token,isAuth];
}