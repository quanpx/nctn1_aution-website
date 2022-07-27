import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auction from "../feature/auctionSlice";
import bid from "../feature/bidSlice"
import auth from "../feature/authSlice"

const reducer = combineReducers({
    auction,
    bid,
    auth
})
export default configureStore({
    reducer,
}
)