import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice({
    name:'auction',
    initialState: {
        currAuction:{},
        currLot:{},
        nextLot:{},
        lots:[],
        registerAuctions:[],
        isStarted: false,
        disableSold: false,
        numUsers: 0
    },
    reducers:
    {
        setAuction: (state,action)=>{
           
            return {...state,currAuction:action.payload.auction};
        },
        setCurrLot: (state,action) => {
            return {...state,currLot:action.payload}
        },
        setNextLot: (state,action) => {
            return {...state,nextLot:action.payload}
        },
        setLots: (state,action) => {
            return {...state,lots: action.payload}
        },
        setDisableSoldButton: (state,action) => {
            return {...state, disableSold: action.payload}
        },
        addRegisterAuction:(state,action)=>{
            console.log(action);
            return {...state,"registerAuctions":[...state.registerAuctions,action.payload.id]}
         
        },
        setIsStarted: (state,action) => {
            return {...state,isStarted: action.payload}
        },
        setNumUsers: (state,action) => {
            return {...state, numUsers: action.payload}
        },

        updateLatestBid: (state,action)=> {
            const body = action.payload
            return {...state, data: body }
        }
    }
})
export const {
     setAuction,addRegisterAuction,
     updateLatestBid,
     setCurrLot,
     setNextLot,
     setLots,
     setDisableSoldButton,
     setIsStarted,
     setNumUsers
    } = auctionSlice.actions
export default auctionSlice.reducer