import { createSlice } from "@reduxjs/toolkit";
const favoriteReducer = createSlice({
    name:'favorite',
    initialState:[],
    reducers:{
        addFavorite:(state,action)=>{
            console.log(action);
            return [...state,action.payload.id]
        },
        removeFavorite:(state,action)=>{
            return state.filter(item=>item.id!==action.payload.id)
        }
    }
})

export const {addFavorite,removeFavorite} = favoriteReducer.actions;
export default favoriteReducer.reducer;