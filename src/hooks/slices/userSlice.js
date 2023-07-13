import {  createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:'user',
    initialState:{},
    reducers: {
        login(state,action){
            const data = action.payload
            return {
                ...state,
                data
            }
        }
    }
})

export const {login} = userSlice.actions;
export default userSlice.reducer;