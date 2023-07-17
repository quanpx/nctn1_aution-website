import { createSlice } from "@reduxjs/toolkit";
const bidReducer = createSlice({
    name:'bid',
    initialState:{
        bids:[],
        latestBid:{},
        disable: false,
        currPrice: 0
    },
    reducers:{
        setBids: (state,action) => {
            console.log(action);
            return {...state,bids: action.payload}

        },
        setLatestBid: (state,action) => {
            return {...state,latestBid: action.payload}
        },
        setCurrPrice: (state,action) => {
            return {...state, currPrice: action.payload}
        },
        addBid:(state,action)=>{
            console.log(action);
            var bids = [];
            return [...state,action.payload.id]
        },
        setDisable: (state,action) => {
            return {...state,disable: action.payload}
        },
        removeBid:(state,action)=>{
            return state.filter(item=>item.id!==action.payload.id)
        }
    }
})

export const {addBid,removeBid,setLatestBid,setBids,setDisable,setCurrPrice} = bidReducer.actions;
export default bidReducer.reducer;