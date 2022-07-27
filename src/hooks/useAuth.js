import React from "react";
import { useSelector } from "react-redux";

export const useAuth = () =>
{
    const {user,isAuth,token} = useSelector(state=>state.auth)

    return [user,token,isAuth];
}