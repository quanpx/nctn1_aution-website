import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import auction from "../feature/auctionSlice";
import bid from "../feature/bidSlice"
import auth from "../feature/authSlice"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
const persistConfig = 
{
    key:'root',
    storage,
}
const reducer = combineReducers({
    auction,
    bid,
    auth
})

const persistReducers=persistReducer(persistConfig,reducer);
export default configureStore({
    reducer:persistReducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
}
)