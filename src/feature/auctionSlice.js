import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice({
    name:'auction',
    initialState: {
        currentAuction:{},
        registerAuctions:[],
        currentLot:{}
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
        setCurrentLot:(state,action)=>{
            return {...state,"currentLot":action.payload.lot}
        }
    }
})
export const {setAuction,addRegisterAuction,setCurrentLot} = auctionSlice.actions
export default auctionSlice.reducer