import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice({
    name:'auction',
    initialState: {
        currentAuction:{},
        registerAuctions:[],
        data:{}
    },
    reducers:
    {
        setAuction: (state,action)=>{
           
            return {...state,"currentAuction":action.payload.auction};
        },
        addRegisterAuction:(state,action)=>{
            console.log(action);
            return {...state,"registerAuctions":[...state.registerAuctions,action.payload.id]}
         
        },
        updateLatestBid: (state,action)=> {
            const body = action.payload
            return {...state, data: body }
        }
    }
})
export const {setAuction,addRegisterAuction, updateLatestBid} = auctionSlice.actions
export default auctionSlice.reducer