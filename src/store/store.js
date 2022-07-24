import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auction from "../feature/auctionSlice";
import bid from "../feature/bidSlice"

const reducer = combineReducers({
    auction,
    bid
})
export default configureStore({
    reducer,
}
)