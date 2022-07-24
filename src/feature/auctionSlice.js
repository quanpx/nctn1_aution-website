import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice({
    name:'auction',
    initialState: {
        currentAuction:{},
        registerAuctions:[]
    },
    reducers:
    {
        setAuction: (state,action)=>{
           
            return {...state,"currentAuction":action.payload.auction};
        },
        addRegisterAuction:(state,action)=>{
            console.log(action);
            return {...state,"registerAuctions":[...state.registerAuctions,action.payload.id]}
         
        }
    }
})
export const {setAuction,addRegisterAuction} = auctionSlice.actions
export default auctionSlice.reducer