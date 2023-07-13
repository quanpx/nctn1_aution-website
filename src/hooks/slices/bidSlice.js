import { createSlice } from "@reduxjs/toolkit";
const bidReducer = createSlice({
    name:'bid',
    initialState:[],
    reducers:{
        addBid:(state,action)=>{
            console.log(action);
            return [...state,action.payload.id]
        },
        removeBid:(state,action)=>{
            return state.filter(item=>item.id!==action.payload.id)
        }
    }
})

export const {addBid,removeBid} = bidReducer.actions;
export default bidReducer.reducer;