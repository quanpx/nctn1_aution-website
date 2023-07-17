import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auction from "../hooks/slices/auctionSlice";
import bid from "../hooks/slices/bidSlice";
import user from "../hooks/slices/userSlice";
import favorite from "../hooks/slices/favoriteSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { favoriteApi } from "../hooks/apis/favoriteApi";
const reducer = combineReducers({
    auction,
    bid,
})

export const store = configureStore({reducer})

