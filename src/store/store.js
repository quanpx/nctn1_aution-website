import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auction from "../hooks/slices/auctionSlice";
import bid from "../hooks/slices/bidSlice";
import user from "../hooks/slices/userSlice";

const reducer = combineReducers({
    auction,
    bid,
    user,
})
export default configureStore({
    reducer,
}
)